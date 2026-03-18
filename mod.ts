// Main export file for Elevation Deno Service

// Export all types
export * from "./types/mod.ts";

// Export shared utilities
export { Cache, Debouncer, uuid } from "./lib/shared/utils.ts";

// Export service modules and classes
export { ElevatedEvents, events } from "./lib/events.ts";
export { ElevatedLogs, elogs } from "./lib/logs.ts";
export { ElevatedIOT, iot } from "./lib/iot.ts";
export { ElevatedEnrollment, enrollment } from "./lib/enrollment.ts";
export { ElevatedConfigurations, elevatedConfigurations } from "./lib/config.ts";
export { CMS, cms } from "./lib/cms.ts";
export { TouchPoint, touchPoint } from "./lib/touchpoint.ts";

// Import the singleton instances for the convenience class
import { events } from "./lib/events.ts";
import { elogs } from "./lib/logs.ts";
import { iot } from "./lib/iot.ts";
import { enrollment } from "./lib/enrollment.ts";
import { elevatedConfigurations } from "./lib/config.ts";
import { cms } from "./lib/cms.ts";
import { touchPoint } from "./lib/touchpoint.ts";
import type { CoreInfo } from "./types/mod.ts";

// Export a convenience class that combines all services
export class ElevationService {
  public events = events;
  public logs = elogs;
  public iot = iot;
  public enrollment = enrollment;
  public config = elevatedConfigurations;
  public cms = cms;
  public touchPoint = touchPoint;

  public initialize(coreInfo: CoreInfo): void {
    // Configure all services
    this.events.config(coreInfo);
    this.logs.config(coreInfo);
    this.enrollment.config(coreInfo);
    this.cms.config(coreInfo);
    this.touchPoint.config(coreInfo);

    // IOT requires additional setup
    if (coreInfo.iotEndpoint && coreInfo.fingerPrint) {
      this.iot.config(coreInfo);
    }

    // Config management requires additional info
    // This should be set separately when needed
  }
}
