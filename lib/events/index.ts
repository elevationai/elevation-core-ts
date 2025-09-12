import { BaseService } from '../shared/base.ts';
import { BatchProcessor } from '../shared/utils.ts';
import type {
  CoreInfo,
  EventData,
  EventOptions,
  DebouncedEvent,
  ApiResponse
} from '../../types/index.ts';
import {
  EventCode,
  StatusCode
} from '../../types/index.ts';

export class ElevatedEvents extends BaseService {
  private defaults: EventOptions = {};
  private debouncedEvents = new Map<number, DebouncedEvent>();
  private batchProcessor: BatchProcessor<EventData>;

  constructor(coreInfo?: CoreInfo) {
    super(coreInfo);
    
    // Initialize batch processor for event batching
    this.batchProcessor = new BatchProcessor<EventData>(
      async (batch) => await this.sendBatch(batch),
      50, // Batch size
      1000 // Batch delay in ms
    );
  }

  public setDefaults(options: EventOptions): void {
    this.defaults = { ...options };
    
    // Setup debounced events
    if (options.debounceEvent) {
      options.debounceEvent.forEach(({ eventCode, debounce }) => {
        this.debouncedEvents.set(eventCode, {
          eventCode,
          lastSent: 0,
          debounceTime: debounce,
          once: false
        });
      });
    }

    if (options.debounceOnce) {
      options.debounceOnce.forEach(({ eventCode, debounce }) => {
        this.debouncedEvents.set(eventCode, {
          eventCode,
          lastSent: 0,
          debounceTime: debounce,
          once: true
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

  public async send(eventData: Partial<EventData>): Promise<ApiResponse> {
    this.checkConfiguration();

    // Apply defaults
    const fullEventData: EventData = {
      eventType: this.defaults.eventType,
      eventMode: this.defaults.eventMode,
      ownerID: this.defaults.ownerID,
      created: new Date(),
      ...eventData,
      eventData: eventData.eventData || {}
    };

    // Check debouncing
    if (fullEventData.eventCode && this.shouldDebounce(fullEventData.eventCode)) {
      return {
        success: true,
        message: 'Event debounced'
      };
    }

    // Add to batch processor
    this.batchProcessor.add(fullEventData);

    return {
      success: true,
      message: 'Event queued for sending'
    };
  }

  private async sendBatch(batch: EventData[]): Promise<void> {
    if (batch.length === 0) return;

    try {
      await this.post('/api/events/batch', { events: batch });
    } catch (error) {
      console.error('Failed to send event batch:', error);
      // Could implement retry logic here
    }
  }

  // Helper methods for different status codes
  public async success(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.SUCCESS
    });
  }

  public async failure(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.FAILURE
    });
  }

  public async error(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.FAILURE
    });
  }

  public async critical(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.CRITICAL_FAILURE
    });
  }

  public async infraction(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.INFRACTION
    });
  }

  public async timeout(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.TIMEOUT
    });
  }

  public async modeChange(eventData: Partial<EventData>): Promise<ApiResponse> {
    return this.send({
      ...eventData,
      statusCode: StatusCode.MODE_CHANGE
    });
  }

  // Flush any pending events
  public async flush(): Promise<void> {
    await this.batchProcessor.flush();
  }

  // Get current queue size
  public get queueSize(): number {
    return this.batchProcessor.queueSize;
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