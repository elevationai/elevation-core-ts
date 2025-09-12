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

export interface ElevatedConfigurationsInfo {
  deviceId: string;
  locationId: string;
}

export interface Software {
  softwareName?: string;
  version?: string;
  lastUpdate?: Date;
  cussVersion?: string;
}

export interface Hardware {
  model?: string;
  resolution?: string;
  processor?: string;
  memory?: string;
  os?: string;
  hasLocalSpecs?: boolean;
}

export interface Metadata {
  inService: boolean;
}

export interface Device {
  _id: string;
  elevatedKey: string;
  label: string;
  note?: string;
  organization: string;
  location?: string;
  terminal?: string;
  hardware?: Hardware;
  software?: Software;
  kioskNumber?: string; // ?
  schedule?: DeviceSchedule;
  metadata?: DeviceMetadata;
  configurations?: { [key: string]: string | number | boolean };
  configurationsOverride?: { [key: string]: boolean };
  settings?: DeviceSettings[];
  images?: { [key: string]: string };
  tags?: string[];
}

export interface DeviceSettings {
  code?: string;
  values?: any;
}

export interface DeviceSchedule {
  uptimeStart?: Date;
  uptimeEnd?: Date;
  follow?: boolean;
}

export interface DeviceMetadata {
  environment?: number;
  testDevice?: boolean;
  configured?: boolean;
  archived?: boolean;
  latitude?: number;
  longitude?: number;
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
  tid?: string; // Transaction ID
  organization?: string; // Organization field
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

export interface DeviceLocation {
	_id?: string;
	code?: string;
	type?: string;
	name?: string;
	terminals: Terminal[];
	organization?: string;
	images?: { [key: string]: string };
	metadata?: LocationMetadata;
	configurations?: { [key: string]: boolean | string | number }
}

export interface LocationMetadata {
	hasElevatedPlatform?: boolean;
	maxBagCheckinTime?: number;
	minBagCheckinTime?: number;
	cussConfigKey?: string;
	rebootTime?: string | Date;
}

export interface Terminal {
  _id: string;
  name: string;
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
  device: Device;
  location: DeviceLocation;
  terminal: Terminal;
  specification: Specification;
  metadata?: DeviceMetadata;
}

export enum LogLevel {
  INFO = "INFO",
  DELAYED = "DELAYED",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL"
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
  [key: string]: any;
}

// Utility type for debouncing
export interface DebouncedEvent {
  eventCode: EventCode | number;
  lastSent: number;
  debounceTime: number;
  once: boolean;
}