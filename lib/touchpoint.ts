import type { CoreInfo, Device } from "../types/mod.ts";
import { BaseService } from "./shared/base.ts";

export class TouchPointClient extends BaseService {
  private touchPointId: string | null = null;

  private constructor(coreInfo: CoreInfo) {
    super(coreInfo);
  }

  static create(coreInfo: CoreInfo): TouchPointClient {
    return new TouchPointClient(coreInfo);
  }

  private getDeviceByFingerPrint(): Promise<Device | null> {
    if (!this.coreInfo.fingerPrint) {
      throw new Error("Device fingerprint is required for TouchPoint service");
    }

    return this.get<Device[]>(`/devices/key/${this.coreInfo.fingerPrint}`)
      .then((res) => {
        if (res.data?.length) {
          const tp = res.data[0] as Device;
          if (tp) this.touchPointId = tp._id;
          return tp;
        }
        return null;
      }).catch((err) => {
        console.error(err);
        return null;
      });
  }

  /**
   * Get complete TouchPoint information
   * @returns TouchPoint information or null if not found
   */
  getInfo(): Promise<Device | null> {
    return this.getDeviceByFingerPrint();
  }

  /**
   * Set the device in service or out of service
   * @param state - true for in-service, false for out-of-service
   * @param reason - Reason for the state change
   */
  async inService(state: boolean, reason: string): Promise<void> {
    if (!this.coreInfo.fingerPrint) {
      throw new Error("Device fingerprint is required for TouchPoint service");
    }

    try {
      if (!this.touchPointId) {
        await this.getDeviceByFingerPrint();
      }
      if (!this.touchPointId) {
        return;
      }

      await this.post(`/devices/service`, {
        id: this.touchPointId,
        state,
        reason,
      });
    }
    catch (error) {
      console.error(`Unable to transition to state: ${state} ${error}`);
    }
  }
}
