import { BaseService } from "../shared/base.ts";
import type { ApiResponse, DebouncedEvent, Device, EventData, EventMetadata, EventOptions } from "../../types/index.ts";
import { type EventCode, StatusCode } from "../../types/index.ts";

export class ElevatedEvents extends BaseService {
  private defaults: EventOptions = {};
  private debouncedEvents = new Map<number, DebouncedEvent>();

  public setDefaults(options: EventOptions): void {
    this.defaults = { ...options };

    // Setup debounced events
    if (options.debounceEvent) {
      options.debounceEvent.forEach(({ eventCode, debounce }) => {
        this.debouncedEvents.set(eventCode, {
          eventCode,
          lastSent: 0,
          debounceTime: debounce,
          once: false,
        });
      });
    }

    if (options.debounceOnce) {
      options.debounceOnce.forEach(({ eventCode, debounce }) => {
        this.debouncedEvents.set(eventCode, {
          eventCode,
          lastSent: 0,
          debounceTime: debounce,
          once: true,
        });
      });
    }
  }

  private shouldDebounce(eventCode: EventCode | number): boolean {
    const debouncedEvent = this.debouncedEvents.get(eventCode);

    if (!debouncedEvent) {
      return false;
    }

    const now = Date.now();
    const timeSinceLastSent = now - debouncedEvent.lastSent;

    if (timeSinceLastSent < debouncedEvent.debounceTime) {
      return true; // Should debounce
    }

    // Update last sent time
    debouncedEvent.lastSent = now;

    // Remove if it's a once-only debounce
    if (debouncedEvent.once) {
      this.debouncedEvents.delete(eventCode);
    }

    return false;
  }

  public async send(eventData: Partial<EventData>, kiosk: Device | null = null): Promise<ApiResponse> {
    this.checkConfiguration();

    // Apply defaults
    const fullEventData: EventData = {
      eventType: this.defaults.eventType,
      eventMode: this.defaults.eventMode,
      ownerID: this.defaults.ownerID,
      created: new Date(),
      ...eventData,
      eventData: eventData.eventData || {},
    };

    // MetaData validation and auto-population (from reference library)
    if (!fullEventData.metaData) {
      const metaData: EventMetadata = {} as EventMetadata;
      if (fullEventData.eventCode) metaData.eventCode = fullEventData.eventCode;
      if (fullEventData.eventData && fullEventData.eventData.airline) {
        metaData.airline = fullEventData.eventData.airline as string;
      }
      if (fullEventData.eventData && fullEventData.eventData.countryCode) {
        metaData.countryCode = fullEventData.eventData.countryCode as string;
      }
      if (fullEventData.ownerID) metaData.ownerID = fullEventData.ownerID;

      if (kiosk) {
        metaData.tags = kiosk.tags || [];
        metaData.location = kiosk.location || undefined;
        metaData.testDevice = !!kiosk.metadata?.testDevice;
      }

      fullEventData.metaData = metaData;
    }

    // Check debouncing
    if (fullEventData.eventCode && this.shouldDebounce(fullEventData.eventCode)) {
      return {
        success: true,
        message: "Event debounced",
      };
    }

    // Send event directly to /events endpoint
    try {
      const response = await this.post("/events", fullEventData);
      return response;
    }
    catch (error) {
      console.error("Failed to send event:", error);
      return {
        success: false,
        error: "Failed to send event",
      };
    }
  }

  // Helper methods for different status codes
  public success(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.SUCCESS,
    });
  }

  public failure(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.FAILURE,
    });
  }

  public error(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.FAILURE,
    });
  }

  public critical(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.CRITICAL_FAILURE,
    });
  }

  public infraction(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.INFRACTION,
    });
  }

  public timeout(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.TIMEOUT,
    });
  }

  public modeChange(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.MODE_CHANGE,
    });
  }

  // Add debounce settings (reference library compatibility)
  public addDebounce(info: Array<{ eventCode: EventCode | number; debounce: number }>): void {
    info.forEach(({ eventCode, debounce }) => {
      this.debouncedEvents.set(eventCode, {
        eventCode,
        lastSent: 0,
        debounceTime: debounce,
        once: false,
      });
    });
  }

  // Add debounce once settings (reference library compatibility)
  public addDebounceOnce(info: Array<{ eventCode: EventCode | number; debounce: number }>): void {
    info.forEach(({ eventCode, debounce }) => {
      this.debouncedEvents.set(eventCode, {
        eventCode,
        lastSent: 0,
        debounceTime: debounce,
        once: true,
      });
    });
  }

  // Clear all debounce settings
  public clearDebounce(): void {
    this.debouncedEvents.clear();
  }

  // Reset to initial state
  public reset(): void {
    this.clearDebounce();
    this.defaults = {};
  }
}

// Export singleton instance
export const events: ElevatedEvents = new ElevatedEvents();
