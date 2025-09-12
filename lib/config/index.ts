import { BaseService } from '../shared/base.ts';
import { Cache } from '../shared/utils.ts';
import type {
  CoreInfo,
  ConfigMgmtInfo,
  ConfigValue,
  ApiResponse
} from '../../types/index.ts';

export class ConfigMgmt extends BaseService {
  private configInfo: ConfigMgmtInfo | null = null;
  private cache: Cache<ConfigValue>;

  constructor(coreInfo?: CoreInfo, configInfo?: ConfigMgmtInfo) {
    super(coreInfo);
    
    // Initialize cache with 5 minute TTL
    this.cache = new Cache<ConfigValue>(5 * 60 * 1000);
    
    if (configInfo) {
      this.configInfo = configInfo;
    }
  }

  public override config(coreInfo: CoreInfo, configInfo?: ConfigMgmtInfo): void {
    super.config(coreInfo);
    
    if (configInfo) {
      this.setConfigInfo(configInfo);
    }
  }

  public setConfigInfo(configInfo: ConfigMgmtInfo): void {
    if (!configInfo.deviceId || !configInfo.locationId) {
      throw new Error('Both deviceId and locationId are required in ConfigMgmtInfo');
    }
    
    this.configInfo = configInfo;
    // Clear cache when config changes
    this.cache.clear();
  }

  private checkConfigInfo(): void {
    if (!this.configInfo) {
      throw new Error('ConfigMgmtInfo not set. Call setConfigInfo() first');
    }
  }

  public async getAllConfigs(): Promise<Record<string, ConfigValue>> {
    this.checkConfiguration();
    this.checkConfigInfo();

    const cacheKey = `all-${this.configInfo!.deviceId}-${this.configInfo!.locationId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached as any;
    }

    const params = new URLSearchParams({
      deviceId: this.configInfo!.deviceId,
      locationId: this.configInfo!.locationId
    });

    const response = await this.get<Record<string, ConfigValue>>(
      `/api/config?${params.toString()}`
    );

    if (response.success && response.data) {
      // Cache the result
      this.cache.set(cacheKey, response.data as any);
      
      // Also cache individual configs
      for (const [key, value] of Object.entries(response.data)) {
        this.cache.set(this.getCacheKey(key), value);
      }
      
      return response.data;
    }

    throw new Error(response.error || 'Failed to get configurations');
  }

  public async getConfig(key: string): Promise<ConfigValue | null> {
    this.checkConfiguration();
    this.checkConfigInfo();

    const cacheKey = this.getCacheKey(key);
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const params = new URLSearchParams({
      key,
      deviceId: this.configInfo!.deviceId,
      locationId: this.configInfo!.locationId
    });

    const response = await this.get<ConfigValue>(
      `/api/config/${encodeURIComponent(key)}?${params.toString()}`
    );

    if (response.success && response.data) {
      // Cache the result
      this.cache.set(cacheKey, response.data);
      return response.data;
    }

    return null;
  }

  public async getConfigs(keys: string[]): Promise<Record<string, ConfigValue>> {
    this.checkConfiguration();
    this.checkConfigInfo();

    const result: Record<string, ConfigValue> = {};
    const uncachedKeys: string[] = [];

    // Check cache first
    for (const key of keys) {
      const cached = this.cache.get(this.getCacheKey(key));
      if (cached) {
        result[key] = cached;
      } else {
        uncachedKeys.push(key);
      }
    }

    // Fetch uncached configs
    if (uncachedKeys.length > 0) {
      const params = new URLSearchParams({
        deviceId: this.configInfo!.deviceId,
        locationId: this.configInfo!.locationId
      });
      
      // Add keys as array
      uncachedKeys.forEach(key => params.append('keys', key));

      const response = await this.post<Record<string, ConfigValue>>(
        `/api/config/batch?${params.toString()}`,
        { keys: uncachedKeys }
      );

      if (response.success && response.data) {
        // Cache and add to result
        for (const [key, value] of Object.entries(response.data)) {
          this.cache.set(this.getCacheKey(key), value);
          result[key] = value;
        }
      }
    }

    return result;
  }

  public async setConfig(key: string, value: any, type: 'global' | 'location' | 'device' = 'device'): Promise<ApiResponse> {
    this.checkConfiguration();
    this.checkConfigInfo();

    const configData = {
      key,
      value,
      type,
      deviceId: type === 'device' ? this.configInfo!.deviceId : undefined,
      locationId: type === 'location' ? this.configInfo!.locationId : undefined
    };

    const response = await this.put(`/api/config/${encodeURIComponent(key)}`, configData);

    if (response.success) {
      // Clear cache for this key
      this.cache.delete(this.getCacheKey(key));
      this.cache.delete(`all-${this.configInfo!.deviceId}-${this.configInfo!.locationId}`);
    }

    return response;
  }

  public async deleteConfig(key: string): Promise<ApiResponse> {
    this.checkConfiguration();
    this.checkConfigInfo();

    const params = new URLSearchParams({
      deviceId: this.configInfo!.deviceId,
      locationId: this.configInfo!.locationId
    });

    const response = await this.delete(
      `/api/config/${encodeURIComponent(key)}?${params.toString()}`
    );

    if (response.success) {
      // Clear cache for this key
      this.cache.delete(this.getCacheKey(key));
      this.cache.delete(`all-${this.configInfo!.deviceId}-${this.configInfo!.locationId}`);
    }

    return response;
  }

  // Helper method to get the resolved value considering overrides
  public getResolvedValue(config: ConfigValue): any {
    // Device override takes precedence
    if (config.overrides?.device !== undefined) {
      return config.overrides.device;
    }
    
    // Then location override
    if (config.overrides?.location !== undefined) {
      return config.overrides.location;
    }
    
    // Finally, the base value
    return config.value;
  }

  // Watch for configuration changes (polling-based)
  public watchConfig(
    key: string,
    callback: (value: ConfigValue | null) => void,
    interval = 30000 // Default 30 seconds
  ): () => void {
    let lastValue: ConfigValue | null = null;
    
    const checkForChanges = async () => {
      try {
        const currentValue = await this.getConfig(key);
        
        if (JSON.stringify(currentValue) !== JSON.stringify(lastValue)) {
          lastValue = currentValue;
          callback(currentValue);
        }
      } catch (error) {
        console.error('Error checking config:', error);
      }
    };

    // Initial check
    checkForChanges();
    
    // Set up interval
    const intervalId = setInterval(checkForChanges, interval);
    
    // Return cleanup function
    return () => clearInterval(intervalId);
  }

  // Clear all cached configurations
  public clearCache(): void {
    this.cache.clear();
  }

  // Get cache statistics
  public getCacheStats(): {
    size: number;
    ttl: number;
  } {
    return {
      size: this.cache['cache'].size,
      ttl: this.cache['ttl']
    };
  }

  private getCacheKey(key: string): string {
    return `${key}-${this.configInfo!.deviceId}-${this.configInfo!.locationId}`;
  }

  // Clean up resources
  public destroy(): void {
    this.cache.destroy();
  }
}

// Export singleton instance
export const configMgmt: ConfigMgmt = new ConfigMgmt();