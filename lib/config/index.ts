import { BaseService } from '../shared/base.ts';
import type { CoreInfo, ElevatedConfigurationsInfo } from '../../types/index.ts';

export class ElevatedConfigurations extends BaseService {
  private configInfo: ElevatedConfigurationsInfo | null = null;

  public override config(coreInfo: CoreInfo, configInfo?: ElevatedConfigurationsInfo): void {
    super.config(coreInfo);

    if (configInfo) {
      this.setConfigInfo(configInfo);
    }
  }

  public setConfigInfo(configInfo: ElevatedConfigurationsInfo): void {
    if (!configInfo.deviceId || !configInfo.locationId) {
      throw new Error('Both deviceId and locationId are required in ElevatedConfigurationsInfo');
    }

    this.configInfo = configInfo;
  }

  private checkConfigInfo(): void {
    if (!this.configInfo) {
      throw new Error('ElevatedConfigurationsInfo not set. Call setConfigInfo() first');
    }
  }

  public getConfig(label: string): Promise<unknown> {
    this.checkConfiguration();
    this.checkConfigInfo();

    return this.get<unknown>(
      `/configurations/${label}/${this.configInfo?.locationId}/${this.configInfo?.deviceId}`,
      { 'Cache-Control': 'no-cache' },
    )
      .then((res) => {
        return res.data || null;
      }).catch((err) => {
        console.error('Error fetching configuration:', err);
        return null;
      });
  }

  public getConfigs(labels: string[]): Promise<(unknown)[]> {
    return Promise.all(labels.map((label: string) => this.getConfig(label)));
  }
}

// Export singleton instance
export const elevatedConfigurations: ElevatedConfigurations = new ElevatedConfigurations();
