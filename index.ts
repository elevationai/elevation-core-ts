// Main export file for Elevation Deno Service

// Export all types
export * from './types/index.ts';

// Export shared utilities
export { uuid, Debouncer, EventEmitter, Cache, BatchProcessor } from './lib/shared/utils.ts';
export { BaseService, RetryHandler } from './lib/shared/base.ts';

// Export service modules and classes
export { ElevatedEvents, events } from './lib/events/index.ts';
export { ElevatedLogs, elogs } from './lib/logs/index.ts';
export { ElevatedIOT, iot } from './lib/iot/index.ts';
export { ElevatedEnrollment, enrollment } from './lib/enrollment/index.ts';
export { ConfigMgmt, configMgmt } from './lib/config/index.ts';

// Import the singleton instances for the convenience class
import { events } from './lib/events/index.ts';
import { elogs } from './lib/logs/index.ts';
import { iot } from './lib/iot/index.ts';
import { enrollment } from './lib/enrollment/index.ts';
import { configMgmt } from './lib/config/index.ts';
import type { CoreInfo } from './types/index.ts';

// Export a convenience class that combines all services
export class ElevationService {
  public events = events;
  public logs = elogs;
  public iot = iot;
  public enrollment = enrollment;
  public config = configMgmt;

  public initialize(coreInfo: CoreInfo): void {
    // Configure all services
    this.events.config(coreInfo);
    this.logs.config(coreInfo);
    this.enrollment.config(coreInfo);
    
    // IOT requires additional setup
    if (coreInfo.iotEndpoint && coreInfo.fingerPrint) {
      this.iot.config(coreInfo);
    }
    
    // Config management requires additional info
    // This should be set separately when needed
  }
}