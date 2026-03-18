import type { EventCode } from "@eai/elevation-types";

// Internal-only type for debouncing implementation
export interface DebouncedEvent {
  eventCode: EventCode | number;
  lastSent: number;
  debounceTime: number;
  once: boolean;
}
