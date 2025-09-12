import { BaseService } from '../shared/base.ts';
import type {
  CoreInfo,
  DeviceUpdate,
  DeviceLocation,
  Specification,
  DeviceInfo,
  Terminal,
  ApiResponse
} from '../../types/index.ts';

export class ElevatedEnrollment extends BaseService {
  private deviceCache: DeviceUpdate | null = null;

  constructor(coreInfo?: CoreInfo) {
    super(coreInfo);
  }

  public override config(coreInfo: CoreInfo): void {
    super.config(coreInfo);
    
    if (!coreInfo.fingerPrint) {
      throw new Error('fingerPrint is required in CoreInfo for Enrollment service');
    }
  }

  public async start(): Promise<DeviceUpdate> {
    this.checkConfiguration();

    const response = await this.post<DeviceUpdate>('/api/enrollment/start', {
      fingerPrint: this.coreInfo!.fingerPrint,
      ipAddress: await this.getLocalIP(),
      macAddress: await this.getMacAddress()
    });

    if (response.success && response.data) {
      this.deviceCache = response.data;
      return response.data;
    }

    throw new Error(response.error || 'Failed to start enrollment');
  }

  public async getLocations(): Promise<DeviceLocation[]> {
    this.checkConfiguration();

    const response = await this.get<DeviceLocation[]>('/api/locations');

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to get locations');
  }

  public async getSpecification(): Promise<Specification[]> {
    this.checkConfiguration();

    const response = await this.get<Specification[]>('/api/specifications');

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to get specifications');
  }

  public async enrollDevice(deviceInfo: DeviceInfo): Promise<ApiResponse> {
    this.checkConfiguration();

    // Validate device info
    if (!deviceInfo.label) {
      throw new Error('Device label is required');
    }

    if (!deviceInfo.location?.id) {
      throw new Error('Location is required');
    }

    if (!deviceInfo.terminal?.id) {
      throw new Error('Terminal is required');
    }

    if (!deviceInfo.specification?.id) {
      throw new Error('Specification is required');
    }

    // Check if label is available
    const isAvailable = await this.isLabelAvailable(deviceInfo.label);
    if (!isAvailable) {
      throw new Error(`Device label '${deviceInfo.label}' is already in use`);
    }

    const enrollmentData = {
      fingerPrint: this.coreInfo!.fingerPrint,
      label: deviceInfo.label,
      locationId: deviceInfo.location.id,
      terminalId: deviceInfo.terminal.id,
      specificationId: deviceInfo.specification.id,
      deviceId: deviceInfo.device?.id,
      ipAddress: await this.getLocalIP(),
      macAddress: await this.getMacAddress()
    };

    const response = await this.post('/api/enrollment/enroll', enrollmentData);

    if (response.success) {
      // Clear cache after successful enrollment
      this.deviceCache = null;
    }

    return response;
  }

  public async isLabelAvailable(label: string): Promise<boolean> {
    this.checkConfiguration();

    if (!label) {
      return false;
    }

    const response = await this.get<{ available: boolean }>(
      `/api/enrollment/check-label?label=${encodeURIComponent(label)}`
    );

    if (response.success && response.data) {
      return response.data.available;
    }

    return false;
  }

  public async updateDevice(update: Partial<DeviceUpdate>): Promise<ApiResponse> {
    this.checkConfiguration();

    const updateData = {
      ...update,
      fingerPrint: this.coreInfo!.fingerPrint
    };

    return await this.put('/api/enrollment/update', updateData);
  }

  public async getDeviceInfo(): Promise<DeviceUpdate | null> {
    this.checkConfiguration();

    if (this.deviceCache) {
      return this.deviceCache;
    }

    const response = await this.get<DeviceUpdate>(
      `/api/enrollment/device?fingerPrint=${encodeURIComponent(this.coreInfo!.fingerPrint!)}`
    );

    if (response.success && response.data) {
      this.deviceCache = response.data;
      return response.data;
    }

    return null;
  }

  public async unenroll(): Promise<ApiResponse> {
    this.checkConfiguration();

    const response = await this.delete(
      `/api/enrollment/unenroll?fingerPrint=${encodeURIComponent(this.coreInfo!.fingerPrint!)}`
    );

    if (response.success) {
      this.deviceCache = null;
    }

    return response;
  }

  // Helper method to get terminals for a specific location
  public async getTerminals(locationId: string): Promise<Terminal[]> {
    this.checkConfiguration();

    const response = await this.get<Terminal[]>(
      `/api/locations/${locationId}/terminals`
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to get terminals');
  }

  // Helper method to validate enrollment status
  public async isEnrolled(): Promise<boolean> {
    const deviceInfo = await this.getDeviceInfo();
    return !!deviceInfo && !!deviceInfo.id;
  }

  // Utility methods for getting system information
  private async getLocalIP(): Promise<string> {
    try {
      // Try to get local IP address
      const conn = await Deno.connect({ hostname: '8.8.8.8', port: 80 });
      const localAddr = conn.localAddr as Deno.NetAddr;
      conn.close();
      return localAddr.hostname;
    } catch {
      return '127.0.0.1';
    }
  }

  private async getMacAddress(): Promise<string> {
    try {
      // In Deno, getting MAC address requires system permissions
      // This is a placeholder - in production, you'd use a system command
      const command = new Deno.Command('ifconfig', {
        args: [],
        stdout: 'piped'
      });
      
      const output = await command.output();
      const text = new TextDecoder().decode(output.stdout);
      
      // Parse MAC address from ifconfig output
      const macMatch = text.match(/([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}/);
      if (macMatch) {
        return macMatch[0];
      }
    } catch {
      // Fallback
    }
    
    return '00:00:00:00:00:00';
  }

  // Clear cached data
  public clearCache(): void {
    this.deviceCache = null;
  }
}

// Export singleton instance
export const enrollment: ElevatedEnrollment = new ElevatedEnrollment();