import { BaseService } from '../shared/base.ts';
import { Debouncer, formatDate } from '../shared/utils.ts';
import type {
  LogData,
  LogOptions,
  ApiResponse
} from '../../types/index.ts';
import { LogLevel } from '../../types/index.ts';

export class ElevatedLogs extends BaseService {
  private defaults: LogOptions = {};
  private debouncer?: Debouncer<(data: LogData) => Promise<ApiResponse>>;
  private lastLogHash = new Map<string, number>();

  public setDefaults(options: LogOptions): void {
    this.defaults = { ...options };
    
    // Setup debouncer if specified
    if (options.debounce) {
      this.debouncer = new Debouncer(
        async (data: LogData) => await this.sendLog(data),
        options.debounce
      );
    }
  }

  private createLogHash(data: LogData): string {
    // Create a hash based on key log properties to identify similar logs
    return `${data.level}-${data.message}-${data.applicationName}-${data.statusCode}`;
  }

  private shouldDebounce(data: LogData): boolean {
    if (!this.defaults.debounce) {
      return false;
    }

    const hash = this.createLogHash(data);
    const now = Date.now();
    const lastSent = this.lastLogHash.get(hash) || 0;

    if (now - lastSent < this.defaults.debounce) {
      return true; // Should debounce
    }

    this.lastLogHash.set(hash, now);
    return false;
  }

  public async message(logData: Partial<LogData>): Promise<ApiResponse> {
    this.checkConfiguration();

    // Apply defaults
    const fullLogData: LogData = {
      deviceId: this.defaults.deviceId || '',
      applicationName: this.defaults.applicationName,
      statusCode: this.defaults.statusCode,
      level: LogLevel.INFO,
      ...logData,
      message: logData.message || ''
    };

    // Validate required fields
    if (!fullLogData.deviceId) {
      throw new Error('deviceId is required for logging');
    }

    if (!fullLogData.message) {
      throw new Error('message is required for logging');
    }

    // Check debouncing
    if (this.shouldDebounce(fullLogData)) {
      return {
        success: true,
        message: 'Log debounced'
      };
    }

    // Send log
    return await this.sendLog(fullLogData);
  }

  private async sendLog(data: LogData): Promise<ApiResponse> {
    const logPayload = {
      ...data,
      timestamp: formatDate(),
      environment: Deno.env.get('DENO_ENV') || 'production'
    };

    try {
      const response = await this.post(`${this.coreInfo?.serviceEndpoint}/logs`, logPayload);
      return response;
    } catch (error) {
      console.error('Failed to send log:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Helper methods for different log levels
  public async information(logData: Partial<LogData>): Promise<ApiResponse> {
    return this.message({
      ...logData,
      level: LogLevel.INFO
    });
  }

  public async delayed(logData: Partial<LogData>): Promise<ApiResponse> {
    return this.message({
      ...logData,
      level: LogLevel.DELAYED
    });
  }

  public async error(logData: Partial<LogData>): Promise<ApiResponse> {
    return this.message({
      ...logData,
      level: LogLevel.ERROR
    });
  }

  public async critical(logData: Partial<LogData>): Promise<ApiResponse> {
    return this.message({
      ...logData,
      level: LogLevel.CRITICAL
    });
  }

  // Send multiple logs individually (since no batch endpoint exists)
  public async batch(logs: Partial<LogData>[]): Promise<ApiResponse> {
    this.checkConfiguration();

    try {
      const results = await Promise.all(
        logs.map(log => this.message(log))
      );
      
      // Check if any failed
      const failures = results.filter(r => !r.success);
      
      if (failures.length === 0) {
        return {
          success: true,
          message: `Successfully sent ${logs.length} logs`
        };
      } else {
        return {
          success: false,
          error: `Failed to send ${failures.length} of ${logs.length} logs`,
          data: { failures }
        };
      }
    } catch (error) {
      console.error('Failed to send batch logs:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Clear debounce cache
  public clearDebounce(): void {
    this.lastLogHash.clear();
    if (this.debouncer) {
      this.debouncer.reset();
    }
  }

  // Reset to initial state
  public reset(): void {
    this.clearDebounce();
    this.defaults = {};
    this.debouncer = undefined;
  }

  // Get log statistics
  public getStats(): {
    debounceActive: boolean;
    cacheSize: number;
    defaults: LogOptions;
  } {
    return {
      debounceActive: !!this.debouncer,
      cacheSize: this.lastLogHash.size,
      defaults: this.defaults
    };
  }
}

// Export singleton instance
export const elogs: ElevatedLogs = new ElevatedLogs();