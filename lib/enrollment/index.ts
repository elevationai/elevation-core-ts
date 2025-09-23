import { BaseService } from "../shared/base.ts";
import type { ApiResponse, CoreInfo, Device, DeviceInfo, DeviceLocation, Specification } from "../../types/index.ts";

export class ElevatedEnrollment extends BaseService {
  private started = false;

  public override config(coreInfo: CoreInfo): void {
    super.config(coreInfo);

    if (!coreInfo.fingerPrint) {
      throw new Error("fingerPrint is required in CoreInfo for Enrollment service");
    }
  }

  public async start(): Promise<Device> {
    this.checkConfiguration();

    const response = await this.get<Device[]>(`/devices/key/${this.coreInfo?.fingerPrint}`);

    if (response.success && response.data) {
      const device = response.data[0] as Device;
      if (device.metadata?.configured) {
        throw new Error("Device is already enrolled");
      }
      else {
        this.started = true;
        return device;
      }
    }

    throw new Error(response.error || "Failed to start enrollment");
  }

  public async getLocations(): Promise<DeviceLocation[]> {
    this.checkConfiguration();

    const response = await this.get<DeviceLocation[]>(`/locations`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || "Failed to get locations");
  }

  public async getSpecification(): Promise<Specification[]> {
    this.checkConfiguration();

    const response = await this.get<Specification[]>(`/speficiations`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || "Failed to get specifications");
  }

  public async enrollDevice(info: DeviceInfo): Promise<ApiResponse> {
    this.checkConfiguration();

    if (!this.started) {
      throw new Error("start subscription first");
    }

    // Validate device info
    if (!info.label) {
      throw new Error("Device label is required");
    }

    if (!info.device?._id) {
      throw new Error("Missing Device information");
    }

    if (!info.location?._id) {
      throw new Error("Location is required");
    }

    if (!info.terminal?._id) {
      throw new Error("Terminal is required");
    }

    if (!info.specification?.id) {
      throw new Error("Specification is required");
    }

    // Check if label is available
    const isAvailable = await this.isLabelAvailable(info.label);
    if (!isAvailable) {
      throw new Error(`Device label '${info.label}' is already in use`);
    }

    info.device.label = info.label;
    info.device.location = info.location._id;
    info.device.terminal = info.terminal._id;
    if (info.specification) {
      info.device.hardware = { model: info.specification.model };
    }
    if (info.metadata) {
      info.device.metadata = info.metadata;
    }
    if (info.location?.configurations) {
      info.device.configurations = {
        ...info.location.configurations,
        ...info.device.configurations,
      };
    }

    const response = await this.patch(`/devices/${info.device._id}`, info.device);

    return response;
  }

  public async isLabelAvailable(label: string): Promise<boolean> {
    this.checkConfiguration();

    if (!label) {
      return false;
    }

    const response = await this.get<Device[]>(`/devices/label/${label}`, {});

    if (response.success && response.data) {
      return response.data.length === 0;
    }

    return false;
  }
}

// Export singleton instance
export const enrollment: ElevatedEnrollment = new ElevatedEnrollment();
