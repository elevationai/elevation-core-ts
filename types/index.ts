// Core interfaces and types for Elevation Deno Service

// Export enums
export * from './enums/event-code.ts';
export * from './enums/event-mode.ts';
export * from './enums/event-type.ts';
export * from './enums/status-codes.ts';

export interface CoreInfo {
  token: string;
  serviceEndpoint: string;
  iotEndpoint?: string;
  iotEvents?: boolean;
  fingerPrint?: string;
  secondary?: boolean;
  timeout?: number;
}

export interface IOTInfo {
  appName: string;
  appVersion?: string;
}

export interface ConfigMgmtInfo {
  deviceId: string;
  locationId: string;
}

// Import enums for use in interfaces
import type { EventCode } from './enums/event-code.ts';
import type { EventType } from './enums/event-type.ts';
import type { EventMode } from './enums/event-mode.ts';
import type { StatusCode } from './enums/status-codes.ts';

// Data structures
export interface EventData {
  eventCode?: EventCode | number;
  eventType?: EventType;
  eventMode?: EventMode;
  eventData: any;
  ownerID?: string;
  statusCode?: StatusCode;
  created?: Date;
  metaData?: any;
}

export interface LogData {
  applicationName?: string;
  level?: LogLevel;
  message: string;
  deviceId: string;
  url?: string;
  body?: string;
  statusCode?: number;
}

export interface DeviceUpdate {
  id?: string;
  label?: string;
  locationId?: string;
  terminalId?: string;
  specificationId?: string;
  fingerPrint?: string;
  ipAddress?: string;
  macAddress?: string;
  status?: string;
  lastSeen?: Date;
}

export interface DeviceLocation {
  id: string;
  name: string;
  code?: string;
  terminals?: Terminal[];
  city?: string;
  country?: string;
  timezone?: string;
}

export interface Terminal {
  id: string;
  name: string;
  code?: string;
  locationId?: string;
}

export interface Specification {
  id: string;
  name: string;
  manufacturer?: string;
  model?: string;
  type?: string;
  capabilities?: string[];
}

export interface DeviceInfo {
  label: string;
  device: DeviceUpdate;
  location: DeviceLocation;
  terminal: Terminal;
  specification: Specification;
}

export enum LogLevel {
  INFO = 0,
  DELAYED = 1,
  ERROR = 2,
  CRITICAL = 3
}

// Options interfaces
export interface EventOptions {
  debounce?: number;
  debounceEvent?: Array<{ eventCode: EventCode | number; debounce: number }>;
  debounceOnce?: Array<{ eventCode: EventCode | number; debounce: number }>;
  eventType?: EventType;
  eventMode?: EventMode;
  ownerID?: string;
}

export interface LogOptions {
  debounce?: number;
  deviceId?: string;
  applicationName?: string;
  statusCode?: number;
}

// IoT Command interface
export interface Commands {
  [key: string]: any;
  refresh?: boolean;
  print?: any;
  flightInfo?: any;
  showBagWaiver?: boolean;
  navigate?: string;
  restart?: boolean;
  config?: any;
}

// Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ConfigValue {
  key: string;
  value: any;
  type: 'global' | 'location' | 'device';
  overrides?: {
    location?: any;
    device?: any;
  };
}

// Utility type for debouncing
export interface DebouncedEvent {
  eventCode: EventCode | number;
  lastSent: number;
  debounceTime: number;
  once: boolean;
}