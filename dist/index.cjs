var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .temp/bundle-entry.js
var bundle_entry_exports = {};
__export(bundle_entry_exports, {
  CMS: () => CMS,
  Cache: () => Cache,
  Debouncer: () => Debouncer,
  ElevatedConfigurations: () => ElevatedConfigurations,
  ElevatedEnrollment: () => ElevatedEnrollment,
  ElevatedEvents: () => ElevatedEvents,
  ElevatedIOT: () => ElevatedIOT,
  ElevatedLogs: () => ElevatedLogs,
  ElevationService: () => ElevationService,
  EventCode: () => EventCode,
  EventEmitter: () => EventEmitter,
  EventMode: () => EventMode,
  EventType: () => EventType,
  LogLevel: () => LogLevel,
  StatusCode: () => StatusCode,
  TouchPoint: () => TouchPoint,
  cms: () => cms,
  elevatedConfigurations: () => elevatedConfigurations,
  elogs: () => elogs,
  enrollment: () => enrollment,
  events: () => events,
  iot: () => iot,
  touchPoint: () => touchPoint,
  uuid: () => uuid
});
module.exports = __toCommonJS(bundle_entry_exports);

// types/enums/event-code.ts
var EventCode = /* @__PURE__ */ ((EventCode3) => {
  EventCode3[EventCode3["PNR_RETRIEVAL"] = 1] = "PNR_RETRIEVAL";
  EventCode3[EventCode3["BAGTAG_PRINT"] = 2] = "BAGTAG_PRINT";
  EventCode3[EventCode3["PAPER_LOW"] = 3] = "PAPER_LOW";
  EventCode3[EventCode3["PAPER_OUT"] = 4] = "PAPER_OUT";
  EventCode3[EventCode3["UPPER_DOOR_OPEN"] = 5] = "UPPER_DOOR_OPEN";
  EventCode3[EventCode3["UPPER_DOOR_CLOSED"] = 6] = "UPPER_DOOR_CLOSED";
  EventCode3[EventCode3["LOWER_DOOR_OPEN"] = 7] = "LOWER_DOOR_OPEN";
  EventCode3[EventCode3["LOWER_DOOR_CLOSED"] = 8] = "LOWER_DOOR_CLOSED";
  EventCode3[EventCode3["PASS_SCANNED"] = 9] = "PASS_SCANNED";
  EventCode3[EventCode3["ONLINE"] = 10] = "ONLINE";
  EventCode3[EventCode3["OFFLINE"] = 11] = "OFFLINE";
  EventCode3[EventCode3["IN_SERVICE"] = 12] = "IN_SERVICE";
  EventCode3[EventCode3["OUT_OF_SERVICE"] = 13] = "OUT_OF_SERVICE";
  EventCode3[EventCode3["PAPER_JAM"] = 14] = "PAPER_JAM";
  EventCode3[EventCode3["TOO_LATE_FOR_FLIGHT"] = 15] = "TOO_LATE_FOR_FLIGHT";
  EventCode3[EventCode3["TOO_EARLY_FOR_FLIGHT"] = 16] = "TOO_EARLY_FOR_FLIGHT";
  EventCode3[EventCode3["INCORRECT_LOCATION"] = 17] = "INCORRECT_LOCATION";
  EventCode3[EventCode3["RESERVATION_NOT_FOUND"] = 18] = "RESERVATION_NOT_FOUND";
  EventCode3[EventCode3["BOARDING_PASS_INVALID"] = 19] = "BOARDING_PASS_INVALID";
  EventCode3[EventCode3["NOT_CHECKED_IN"] = 120] = "NOT_CHECKED_IN";
  EventCode3[EventCode3["INELIGIBLE"] = 121] = "INELIGIBLE";
  EventCode3[EventCode3["INTERNATIONAL"] = 122] = "INTERNATIONAL";
  EventCode3[EventCode3["PREVIOUSLY_PRINTED"] = 123] = "PREVIOUSLY_PRINTED";
  EventCode3[EventCode3["NO_BAGS"] = 64] = "NO_BAGS";
  EventCode3[EventCode3["WRONG_AIRLINE"] = 65] = "WRONG_AIRLINE";
  EventCode3[EventCode3["PRINTER_FAILURE"] = 66] = "PRINTER_FAILURE";
  EventCode3[EventCode3["UNAUTHORIZED_CROSSING_ENTRANCE"] = 20] = "UNAUTHORIZED_CROSSING_ENTRANCE";
  EventCode3[EventCode3["UNAUTHORIZED_CROSSING_EXIT"] = 21] = "UNAUTHORIZED_CROSSING_EXIT";
  EventCode3[EventCode3["FRAUD_CRAWLING"] = 22] = "FRAUD_CRAWLING";
  EventCode3[EventCode3["FRAUD_JUMP"] = 23] = "FRAUD_JUMP";
  EventCode3[EventCode3["UNAUTHORIZED_STANDING_AT_ENTRANCE"] = 24] = "UNAUTHORIZED_STANDING_AT_ENTRANCE";
  EventCode3[EventCode3["UNAUTHORIZED_STANDING_AT_EXIT"] = 25] = "UNAUTHORIZED_STANDING_AT_EXIT";
  EventCode3[EventCode3["STOP_IN_GATE"] = 26] = "STOP_IN_GATE";
  EventCode3[EventCode3["ONE_BOARD_ONE_LEFT_ENTRANCE"] = 27] = "ONE_BOARD_ONE_LEFT_ENTRANCE";
  EventCode3[EventCode3["TWO_BOARDED"] = 28] = "TWO_BOARDED";
  EventCode3[EventCode3["ONE_BOARDED_ONE_CROSSED"] = 29] = "ONE_BOARDED_ONE_CROSSED";
  EventCode3[EventCode3["ONE_CROSSED_LEFT_ENTRANCE"] = 30] = "ONE_CROSSED_LEFT_ENTRANCE";
  EventCode3[EventCode3["ONE_BOARDED_THEN_LEFT_VIA_ENTRANCE"] = 31] = "ONE_BOARDED_THEN_LEFT_VIA_ENTRANCE";
  EventCode3[EventCode3["BOARDED_WITHOUT_AUTHORIZATION"] = 32] = "BOARDED_WITHOUT_AUTHORIZATION";
  EventCode3[EventCode3["CROSSING_ENTRANCE_TIMEOUT"] = 33] = "CROSSING_ENTRANCE_TIMEOUT";
  EventCode3[EventCode3["CROSSING_EXIT_TIMEOUT"] = 34] = "CROSSING_EXIT_TIMEOUT";
  EventCode3[EventCode3["EXIT_NOT_CLEARED_TIMEOUT"] = 35] = "EXIT_NOT_CLEARED_TIMEOUT";
  EventCode3[EventCode3["GATE_ENTRY_TIMEOUT"] = 36] = "GATE_ENTRY_TIMEOUT";
  EventCode3[EventCode3["GATE_CROSSING_TIMEOUT"] = 37] = "GATE_CROSSING_TIMEOUT";
  EventCode3[EventCode3["MANTRAP_VALIDATION_TIMEOUT"] = 38] = "MANTRAP_VALIDATION_TIMEOUT";
  EventCode3[EventCode3["EXIT_AREA_CLEAR"] = 39] = "EXIT_AREA_CLEAR";
  EventCode3[EventCode3["EXIT_AREA_OCCUPIED"] = 40] = "EXIT_AREA_OCCUPIED";
  EventCode3[EventCode3["SELF_BOARDING_COMPLETE"] = 41] = "SELF_BOARDING_COMPLETE";
  EventCode3[EventCode3["NO_PASS_FIRST_SENSOR"] = 42] = "NO_PASS_FIRST_SENSOR";
  EventCode3[EventCode3["NO_PASS_LAST_SENSOR"] = 43] = "NO_PASS_LAST_SENSOR";
  EventCode3[EventCode3["BOARDING_CANCELED"] = 44] = "BOARDING_CANCELED";
  EventCode3[EventCode3["SENSOR_FAILURE"] = 45] = "SENSOR_FAILURE";
  EventCode3[EventCode3["FLAPS_FAILURE"] = 46] = "FLAPS_FAILURE";
  EventCode3[EventCode3["PAPER_RESTOCK"] = 47] = "PAPER_RESTOCK";
  EventCode3[EventCode3["SESSION_TIME"] = 48] = "SESSION_TIME";
  EventCode3[EventCode3["ALARM"] = 49] = "ALARM";
  EventCode3[EventCode3["EXIT_BLOCKED"] = 50] = "EXIT_BLOCKED";
  EventCode3[EventCode3["INCORRECT_GATE"] = 51] = "INCORRECT_GATE";
  EventCode3[EventCode3["GATE_OPEN"] = 52] = "GATE_OPEN";
  EventCode3[EventCode3["GATE_CLOSED"] = 53] = "GATE_CLOSED";
  EventCode3[EventCode3["GATE_AUTHORIZED"] = 54] = "GATE_AUTHORIZED";
  EventCode3[EventCode3["EMERGENCY"] = 55] = "EMERGENCY";
  EventCode3[EventCode3["MAINTENANCE"] = 56] = "MAINTENANCE";
  EventCode3[EventCode3["BOARDING_PASS_PREVIOUSLY_USED"] = 57] = "BOARDING_PASS_PREVIOUSLY_USED";
  EventCode3[EventCode3["GATE_INOPERABLE"] = 58] = "GATE_INOPERABLE";
  EventCode3[EventCode3["GATE_EMPLOYEE_AUTHORIZED"] = 59] = "GATE_EMPLOYEE_AUTHORIZED";
  EventCode3[EventCode3["FREESTATE"] = 60] = "FREESTATE";
  EventCode3[EventCode3["CONTROLSTATE"] = 61] = "CONTROLSTATE";
  EventCode3[EventCode3["PRMMODE"] = 62] = "PRMMODE";
  EventCode3[EventCode3["AIRLINE_PASS"] = 63] = "AIRLINE_PASS";
  EventCode3[EventCode3["BOARDING_PASS_PRINT"] = 68] = "BOARDING_PASS_PRINT";
  EventCode3[EventCode3["APPLICATION_AVAILABLE"] = 69] = "APPLICATION_AVAILABLE";
  EventCode3[EventCode3["APPLICATION_UNAVAILABLE"] = 70] = "APPLICATION_UNAVAILABLE";
  EventCode3[EventCode3["APPLICATION_ACTIVE"] = 71] = "APPLICATION_ACTIVE";
  EventCode3[EventCode3["APPLICATION_STOP"] = 72] = "APPLICATION_STOP";
  EventCode3[EventCode3["PASSPORT_SCANNED"] = 73] = "PASSPORT_SCANNED";
  EventCode3[EventCode3["BAGTAG_PRINTER_ONLINE"] = 74] = "BAGTAG_PRINTER_ONLINE";
  EventCode3[EventCode3["BAGTAG_PRINTER_OFFLINE"] = 75] = "BAGTAG_PRINTER_OFFLINE";
  EventCode3[EventCode3["BARCODE_READER_ONLINE"] = 76] = "BARCODE_READER_ONLINE";
  EventCode3[EventCode3["BARCODE_READER_OFFLINE"] = 77] = "BARCODE_READER_OFFLINE";
  EventCode3[EventCode3["PASSPORT_READER_ONLINE"] = 78] = "PASSPORT_READER_ONLINE";
  EventCode3[EventCode3["PASSPORT_READER_OFFLINE"] = 79] = "PASSPORT_READER_OFFLINE";
  EventCode3[EventCode3["BOARDINGPASS_PRINTER_ONLINE"] = 90] = "BOARDINGPASS_PRINTER_ONLINE";
  EventCode3[EventCode3["BOARDINGPASS_PRINTER_OFFLINE"] = 91] = "BOARDINGPASS_PRINTER_OFFLINE";
  EventCode3[EventCode3["BOARDINGPASS_PRINTER_PAPER_OUT"] = 92] = "BOARDINGPASS_PRINTER_PAPER_OUT";
  EventCode3[EventCode3["BOARDINGPASS_PRINTER_PAPER_LOW"] = 93] = "BOARDINGPASS_PRINTER_PAPER_LOW";
  EventCode3[EventCode3["BOARDINGPASS_PRINTER_PAPER_JAM"] = 94] = "BOARDINGPASS_PRINTER_PAPER_JAM";
  EventCode3[EventCode3["BOARDINGPASS_PRINTER_PAPER_RESTOCK"] = 95] = "BOARDINGPASS_PRINTER_PAPER_RESTOCK";
  EventCode3[EventCode3["BOARDINGPASS_PRINTER_FAILURE"] = 96] = "BOARDINGPASS_PRINTER_FAILURE";
  EventCode3[EventCode3["CONFIGURATION_REQUESTED"] = 103] = "CONFIGURATION_REQUESTED";
  EventCode3[EventCode3["CONFIGURATION_COMPLETED"] = 110] = "CONFIGURATION_COMPLETED";
  EventCode3[EventCode3["PASSENGER_CHECK_IN"] = 104] = "PASSENGER_CHECK_IN";
  EventCode3[EventCode3["PASSENGER_CHECK_IN_FAILED"] = 105] = "PASSENGER_CHECK_IN_FAILED";
  EventCode3[EventCode3["BAGTAG_PRINT_FAILURE"] = 106] = "BAGTAG_PRINT_FAILURE";
  EventCode3[EventCode3["APPLICATION_ACTIVE_ACCESSIBLE"] = 108] = "APPLICATION_ACTIVE_ACCESSIBLE";
  EventCode3[EventCode3["APPLICATION_INITIALIZE"] = 109] = "APPLICATION_INITIALIZE";
  EventCode3[EventCode3["CARDREADER_ONLINE"] = 111] = "CARDREADER_ONLINE";
  EventCode3[EventCode3["CARDREADER_OFFLINE"] = 112] = "CARDREADER_OFFLINE";
  EventCode3[EventCode3["CARDREADER_FAILURE"] = 113] = "CARDREADER_FAILURE";
  EventCode3[EventCode3["CARDREADER_READ"] = 114] = "CARDREADER_READ";
  EventCode3[EventCode3["ANNOUNCEMENT_ONLINE"] = 115] = "ANNOUNCEMENT_ONLINE";
  EventCode3[EventCode3["ANNOUNCEMENT_OFFLINE"] = 116] = "ANNOUNCEMENT_OFFLINE";
  EventCode3[EventCode3["KEYPAD_ONLINE"] = 117] = "KEYPAD_ONLINE";
  EventCode3[EventCode3["KEYPAD_OFFLINE"] = 118] = "KEYPAD_OFFLINE";
  EventCode3[EventCode3["ILLUMINATION_ONLINE"] = 119] = "ILLUMINATION_ONLINE";
  EventCode3[EventCode3["ILLUMINATION_OFFLINE"] = 124] = "ILLUMINATION_OFFLINE";
  EventCode3[EventCode3["HEADSET_ONLINE"] = 125] = "HEADSET_ONLINE";
  EventCode3[EventCode3["HEADSET_OFFLINE"] = 126] = "HEADSET_OFFLINE";
  EventCode3[EventCode3["FEEDER_ONLINE"] = 127] = "FEEDER_ONLINE";
  EventCode3[EventCode3["FEEDER_OFFLINE"] = 128] = "FEEDER_OFFLINE";
  EventCode3[EventCode3["DISPENSER_ONLINE"] = 129] = "DISPENSER_ONLINE";
  EventCode3[EventCode3["DISPENSER_OFFLINE"] = 130] = "DISPENSER_OFFLINE";
  EventCode3[EventCode3["NO_DOCV"] = 131] = "NO_DOCV";
  EventCode3[EventCode3["DOCS_VERIFIED_PRINTING_ALLOWED"] = 132] = "DOCS_VERIFIED_PRINTING_ALLOWED";
  EventCode3[EventCode3["GROUP_BOOKING_NOT_SUPPORTED"] = 135] = "GROUP_BOOKING_NOT_SUPPORTED";
  EventCode3[EventCode3["ERROR_GENERIC"] = 400] = "ERROR_GENERIC";
  EventCode3[EventCode3["USER_LOGIN"] = 107] = "USER_LOGIN";
  EventCode3[EventCode3["TEST_ENV"] = 215] = "TEST_ENV";
  EventCode3[EventCode3["AGENT_LOGIN_ACTIVATION"] = 200] = "AGENT_LOGIN_ACTIVATION";
  EventCode3[EventCode3["AGENT_LOGOUT_ACTIVATION"] = 201] = "AGENT_LOGOUT_ACTIVATION";
  EventCode3[EventCode3["PAX_ACTIVATION_TIME"] = 202] = "PAX_ACTIVATION_TIME";
  EventCode3[EventCode3["BAG_TAG_NOT_FOUND"] = 204] = "BAG_TAG_NOT_FOUND";
  EventCode3[EventCode3["EXPIRED_DRIVERS_LICENSE"] = 205] = "EXPIRED_DRIVERS_LICENSE";
  EventCode3[EventCode3["VALID_DRIVERS_LICENSE"] = 206] = "VALID_DRIVERS_LICENSE";
  EventCode3[EventCode3["NOT_PART_OF_RESERVATION"] = 207] = "NOT_PART_OF_RESERVATION";
  EventCode3[EventCode3["ID_MATCH_NOT_FOUND"] = 208] = "ID_MATCH_NOT_FOUND";
  EventCode3[EventCode3["BAG_ALREADY_ACTIVATED"] = 209] = "BAG_ALREADY_ACTIVATED";
  EventCode3[EventCode3["UNABLE_TO_ACTIVATE_BAG"] = 210] = "UNABLE_TO_ACTIVATE_BAG";
  EventCode3[EventCode3["INVALID_BAGTAG"] = 216] = "INVALID_BAGTAG";
  EventCode3[EventCode3["BOARDED"] = 211] = "BOARDED";
  EventCode3[EventCode3["BEGIN_BOARDING_FAILED"] = 212] = "BEGIN_BOARDING_FAILED";
  EventCode3[EventCode3["BOARDING_ENDED"] = 213] = "BOARDING_ENDED";
  EventCode3[EventCode3["BOARDING_FAILED"] = 214] = "BOARDING_FAILED";
  EventCode3[EventCode3["INVALID_BOARDING_PASS"] = 217] = "INVALID_BOARDING_PASS";
  EventCode3[EventCode3["FLIGHT_SCANNED_MISMATCH"] = 218] = "FLIGHT_SCANNED_MISMATCH";
  EventCode3[EventCode3["SCANNED_WITHOUT_STARTING"] = 219] = "SCANNED_WITHOUT_STARTING";
  EventCode3[EventCode3["BOARDING_STARTED"] = 220] = "BOARDING_STARTED";
  EventCode3[EventCode3["ZONING_ATTEMPT_FAILED"] = 221] = "ZONING_ATTEMPT_FAILED";
  EventCode3[EventCode3["ZONING_CHNAGE"] = 222] = "ZONING_CHNAGE";
  EventCode3[EventCode3["ZONING_TIME"] = 223] = "ZONING_TIME";
  EventCode3[EventCode3["FLIGHT_ROOM_JOINED"] = 224] = "FLIGHT_ROOM_JOINED";
  EventCode3[EventCode3["FLIGHT_ROOM_LEFT"] = 225] = "FLIGHT_ROOM_LEFT";
  EventCode3[EventCode3["MANIFEST_SUCCESS"] = 226] = "MANIFEST_SUCCESS";
  EventCode3[EventCode3["MANIFEST_ERROR"] = 227] = "MANIFEST_ERROR";
  EventCode3[EventCode3["SOCKET_COMMAND"] = 228] = "SOCKET_COMMAND";
  EventCode3[EventCode3["REQUEST_PROFILING"] = 203] = "REQUEST_PROFILING";
  EventCode3[EventCode3["FAILED_TO_READ_BAG_TAG"] = 300] = "FAILED_TO_READ_BAG_TAG";
  EventCode3[EventCode3["BAG_TAG_FOUND"] = 301] = "BAG_TAG_FOUND";
  EventCode3[EventCode3["BAG_SETTLED"] = 302] = "BAG_SETTLED";
  EventCode3[EventCode3["BAG_AT_ENTRY"] = 303] = "BAG_AT_ENTRY";
  EventCode3[EventCode3["BAG_IN_HOLDING_AREA"] = 304] = "BAG_IN_HOLDING_AREA";
  EventCode3[EventCode3["WAITING_ON_BHS"] = 305] = "WAITING_ON_BHS";
  EventCode3[EventCode3["INTRUSION_DETECTED"] = 306] = "INTRUSION_DETECTED";
  EventCode3[EventCode3["NO_BAG_DETECTED"] = 307] = "NO_BAG_DETECTED";
  EventCode3[EventCode3["TRYING_TO_ACQUIRE_BAG_TAG"] = 308] = "TRYING_TO_ACQUIRE_BAG_TAG";
  EventCode3[EventCode3["BAG_RELEASED"] = 309] = "BAG_RELEASED";
  EventCode3[EventCode3["MOVE_TO_HOLDING_AREA"] = 310] = "MOVE_TO_HOLDING_AREA";
  EventCode3[EventCode3["CANCEL_NEED_INTERVENTION"] = 311] = "CANCEL_NEED_INTERVENTION";
  EventCode3[EventCode3["CANCEL_PASSENGER_CAN_FIX"] = 312] = "CANCEL_PASSENGER_CAN_FIX";
  EventCode3[EventCode3["MULTIPLE_BAG_TAGS_ERROR"] = 313] = "MULTIPLE_BAG_TAGS_ERROR";
  EventCode3[EventCode3["MULTIPLE_BAGS_ERROR"] = 314] = "MULTIPLE_BAGS_ERROR";
  EventCode3[EventCode3["HOLDING_AREA_FULL"] = 315] = "HOLDING_AREA_FULL";
  EventCode3[EventCode3["BAG_CANNOT_RELEASE"] = 316] = "BAG_CANNOT_RELEASE";
  EventCode3[EventCode3["BAG_CANNOT_PROCESS"] = 317] = "BAG_CANNOT_PROCESS";
  EventCode3[EventCode3["CONVEY_BELT_INOPERABLE"] = 318] = "CONVEY_BELT_INOPERABLE";
  EventCode3[EventCode3["UNKNOWN_SBD_ERROR"] = 319] = "UNKNOWN_SBD_ERROR";
  EventCode3[EventCode3["BAG_OVER_LENGTH"] = 320] = "BAG_OVER_LENGTH";
  EventCode3[EventCode3["BAG_OVER_HEIGHT"] = 321] = "BAG_OVER_HEIGHT";
  EventCode3[EventCode3["BAG_JAMMED_INSIDE"] = 322] = "BAG_JAMMED_INSIDE";
  EventCode3[EventCode3["UNEXPECTED_BAG_IN_REAR"] = 323] = "UNEXPECTED_BAG_IN_REAR";
  EventCode3[EventCode3["BAG_TOO_FLAT"] = 324] = "BAG_TOO_FLAT";
  EventCode3[EventCode3["BAG_TOO_SHORT"] = 325] = "BAG_TOO_SHORT";
  EventCode3[EventCode3["BAG_OVERWEIGHT"] = 326] = "BAG_OVERWEIGHT";
  EventCode3[EventCode3["BAG_UNDERWEIGHT"] = 327] = "BAG_UNDERWEIGHT";
  EventCode3[EventCode3["BAG_NOT_SETTLED"] = 328] = "BAG_NOT_SETTLED";
  EventCode3[EventCode3["BAG_NOT_CONVEYABLE"] = 329] = "BAG_NOT_CONVEYABLE";
  EventCode3[EventCode3["BHS_OFFLINE"] = 330] = "BHS_OFFLINE";
  EventCode3[EventCode3["BHS_BUSY"] = 331] = "BHS_BUSY";
  EventCode3[EventCode3["FRONT_BAG_BLOCKING_REAR_RETURN"] = 332] = "FRONT_BAG_BLOCKING_REAR_RETURN";
  EventCode3[EventCode3["TECHNICAL_ERROR"] = 333] = "TECHNICAL_ERROR";
  EventCode3[EventCode3["BAG_UNEXPECTEDLY_REMOVED"] = 334] = "BAG_UNEXPECTEDLY_REMOVED";
  return EventCode3;
})(EventCode || {});

// types/enums/event-mode.ts
var EventMode = /* @__PURE__ */ ((EventMode2) => {
  EventMode2[EventMode2["CUSS"] = 1] = "CUSS";
  EventMode2[EventMode2["NONCUSS"] = 2] = "NONCUSS";
  EventMode2[EventMode2["SELF_BOARDING_MODE"] = 5] = "SELF_BOARDING_MODE";
  EventMode2[EventMode2["LOCKED_MODE"] = 6] = "LOCKED_MODE";
  EventMode2[EventMode2["OPEN_MODE"] = 7] = "OPEN_MODE";
  EventMode2[EventMode2["DEBOARDING_MODE"] = 8] = "DEBOARDING_MODE";
  EventMode2[EventMode2["EMERGENCY_MODE"] = 9] = "EMERGENCY_MODE";
  EventMode2[EventMode2["MAINTENANCE_MODE"] = 10] = "MAINTENANCE_MODE";
  return EventMode2;
})(EventMode || {});

// types/enums/event-type.ts
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2[EventType2["TAGGING_KIOSK"] = 1] = "TAGGING_KIOSK";
  EventType2[EventType2["CHECKIN_KIOSK"] = 2] = "CHECKIN_KIOSK";
  EventType2[EventType2["GATE"] = 3] = "GATE";
  EventType2[EventType2["ADMIN_PANEL"] = 4] = "ADMIN_PANEL";
  EventType2[EventType2["HUB"] = 5] = "HUB";
  EventType2[EventType2["CUSTOM_APP"] = 6] = "CUSTOM_APP";
  EventType2[EventType2["PLATFORM"] = 7] = "PLATFORM";
  EventType2[EventType2["PROXY"] = 8] = "PROXY";
  EventType2[EventType2["EXTERNAL_API"] = 9] = "EXTERNAL_API";
  return EventType2;
})(EventType || {});

// types/enums/status-codes.ts
var StatusCode = /* @__PURE__ */ ((StatusCode2) => {
  StatusCode2[StatusCode2["SUCCESS"] = 200] = "SUCCESS";
  StatusCode2[StatusCode2["MODE_CHANGE"] = 300] = "MODE_CHANGE";
  StatusCode2[StatusCode2["FAILURE"] = 400] = "FAILURE";
  StatusCode2[StatusCode2["CRITICAL_FAILURE"] = 500] = "CRITICAL_FAILURE";
  StatusCode2[StatusCode2["INFRACTION"] = 501] = "INFRACTION";
  StatusCode2[StatusCode2["TIMEOUT"] = 502] = "TIMEOUT";
  return StatusCode2;
})(StatusCode || {});

// types/index.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["INFO"] = "INFO";
  LogLevel2["DELAYED"] = "DELAYED";
  LogLevel2["ERROR"] = "ERROR";
  LogLevel2["CRITICAL"] = "CRITICAL";
  return LogLevel2;
})(LogLevel || {});

// lib/shared/utils.ts
function uuid() {
  return crypto.randomUUID();
}
var Debouncer = class {
  constructor(fn, delay) {
    this.fn = fn;
    this.delay = delay;
  }
  timeoutId = null;
  lastCall = 0;
  call(...args) {
    const now = Date.now();
    if (now - this.lastCall < this.delay) {
      return;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.lastCall = now;
    this.fn(...args);
  }
  async callAsync(...args) {
    const now = Date.now();
    if (now - this.lastCall < this.delay) {
      return;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.lastCall = now;
    return await this.fn(...args);
  }
  reset() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.lastCall = 0;
  }
};
var EventEmitter = class {
  listeners = [];
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  emit(data) {
    this.listeners.forEach((listener) => listener(data));
  }
  clear() {
    this.listeners = [];
  }
  get listenerCount() {
    return this.listeners.length;
  }
};
var Cache = class {
  constructor(ttl = 6e4, autoCleanup = true) {
    this.ttl = ttl;
    if (autoCleanup) {
      this.startAutoCleanup();
    }
  }
  cache = /* @__PURE__ */ new Map();
  cleanupInterval = null;
  set(key, value, customTtl) {
    const expires = Date.now() + (customTtl || this.ttl);
    this.cache.set(key, { value, expires });
  }
  get(key) {
    const item = this.cache.get(key);
    if (!item) {
      return void 0;
    }
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return void 0;
    }
    return item.value;
  }
  has(key) {
    return this.get(key) !== void 0;
  }
  delete(key) {
    return this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
  startAutoCleanup() {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now > item.expires) {
          this.cache.delete(key);
        }
      }
    }, this.ttl);
  }
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
};
function formatDate(date = /* @__PURE__ */ new Date()) {
  return date.toISOString();
}

// lib/shared/base.ts
var BaseService = class {
  coreInfo = null;
  configured = false;
  headers = new Headers();
  config(coreInfo) {
    this.validateCoreInfo(coreInfo);
    this.coreInfo = coreInfo;
    this.setupHeaders();
    this.configured = true;
  }
  validateCoreInfo(coreInfo) {
    if (!coreInfo.token) {
      throw new Error("Token is required in CoreInfo");
    }
    if (!coreInfo.serviceEndpoint) {
      throw new Error("Service endpoint is required in CoreInfo");
    }
  }
  setupHeaders() {
    if (!this.coreInfo)
      return;
    this.headers = new Headers({
      "Elevated-Auth": btoa(this.coreInfo.token)
    });
  }
  checkConfiguration() {
    if (!this.configured || !this.coreInfo) {
      throw new Error("Service not configured. Call config() first with CoreInfo");
    }
  }
  async makeRequest(path, options = {}) {
    this.checkConfiguration();
    const url = `${this.coreInfo.serviceEndpoint}${path}`;
    const timeout = this.coreInfo.timeout || 3e4;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...Object.fromEntries(this.headers.entries()),
          ...Object.fromEntries(new Headers(options.headers || {}).entries())
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            error: "Request timeout",
            message: `Request timed out after ${timeout}ms`
          };
        }
        return {
          success: false,
          error: error.message
        };
      }
      return {
        success: false,
        error: "Unknown error occurred"
      };
    }
  }
  async post(path, data) {
    return this.makeRequest(path, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async patch(path, data) {
    return this.makeRequest(path, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
  }
  async get(path, headers) {
    return this.makeRequest(path, {
      method: "GET",
      headers
    });
  }
  async put(path, data) {
    return this.makeRequest(path, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  async delete(path) {
    return this.makeRequest(path, {
      method: "DELETE"
    });
  }
};

// lib/events/index.ts
var ElevatedEvents = class extends BaseService {
  defaults = {};
  debouncedEvents = /* @__PURE__ */ new Map();
  setDefaults(options) {
    this.defaults = { ...options };
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
  shouldDebounce(eventCode) {
    const debouncedEvent = this.debouncedEvents.get(eventCode);
    if (!debouncedEvent) {
      return false;
    }
    const now = Date.now();
    const timeSinceLastSent = now - debouncedEvent.lastSent;
    if (timeSinceLastSent < debouncedEvent.debounceTime) {
      return true;
    }
    debouncedEvent.lastSent = now;
    if (debouncedEvent.once) {
      this.debouncedEvents.delete(eventCode);
    }
    return false;
  }
  async send(eventData, kiosk = null) {
    this.checkConfiguration();
    const fullEventData = {
      eventType: this.defaults.eventType,
      eventMode: this.defaults.eventMode,
      ownerID: this.defaults.ownerID,
      created: /* @__PURE__ */ new Date(),
      ...eventData,
      eventData: eventData.eventData || {}
    };
    if (!fullEventData.metaData) {
      const metaData = {};
      if (fullEventData.eventCode)
        metaData.eventCode = fullEventData.eventCode;
      if (fullEventData.eventData && fullEventData.eventData.airline)
        metaData.airline = fullEventData.eventData.airline;
      if (fullEventData.eventData && fullEventData.eventData.countryCode)
        metaData.countryCode = fullEventData.eventData.countryCode;
      if (fullEventData.ownerID)
        metaData.ownerID = fullEventData.ownerID;
      if (kiosk) {
        metaData.tags = kiosk.tags || [];
        metaData.location = kiosk.location || null;
        metaData.testDevice = !!kiosk.metadata.testDevice;
      }
      fullEventData.metaData = metaData;
    }
    if (fullEventData.eventCode && this.shouldDebounce(fullEventData.eventCode)) {
      return {
        success: true,
        message: "Event debounced"
      };
    }
    try {
      const response = await this.post("/events", fullEventData);
      return response;
    } catch (error) {
      console.error("Failed to send event:", error);
      return {
        success: false,
        error: "Failed to send event"
      };
    }
  }
  // Helper methods for different status codes
  async success(eventData) {
    return this.send({
      ...eventData,
      statusCode: 200 /* SUCCESS */
    });
  }
  async failure(eventData) {
    return this.send({
      ...eventData,
      statusCode: 400 /* FAILURE */
    });
  }
  async error(eventData) {
    return this.send({
      ...eventData,
      statusCode: 400 /* FAILURE */
    });
  }
  async critical(eventData) {
    return this.send({
      ...eventData,
      statusCode: 500 /* CRITICAL_FAILURE */
    });
  }
  async infraction(eventData) {
    return this.send({
      ...eventData,
      statusCode: 501 /* INFRACTION */
    });
  }
  async timeout(eventData) {
    return this.send({
      ...eventData,
      statusCode: 502 /* TIMEOUT */
    });
  }
  async modeChange(eventData) {
    return this.send({
      ...eventData,
      statusCode: 300 /* MODE_CHANGE */
    });
  }
  // Add debounce settings (reference library compatibility)
  addDebounce(info) {
    info.forEach(({ eventCode, debounce }) => {
      this.debouncedEvents.set(eventCode, {
        eventCode,
        lastSent: 0,
        debounceTime: debounce,
        once: false
      });
    });
  }
  // Add debounce once settings (reference library compatibility)
  addDebounceOnce(info) {
    info.forEach(({ eventCode, debounce }) => {
      this.debouncedEvents.set(eventCode, {
        eventCode,
        lastSent: 0,
        debounceTime: debounce,
        once: true
      });
    });
  }
  // Clear all debounce settings
  clearDebounce() {
    this.debouncedEvents.clear();
  }
  // Reset to initial state
  reset() {
    this.clearDebounce();
    this.defaults = {};
  }
};
var events = new ElevatedEvents();

// lib/logs/index.ts
var ElevatedLogs = class extends BaseService {
  defaults = {};
  debouncer;
  lastLogHash = /* @__PURE__ */ new Map();
  setDefaults(options) {
    this.defaults = { ...options };
    if (options.debounce) {
      this.debouncer = new Debouncer(
        async (data) => await this.sendLog(data),
        options.debounce
      );
    }
  }
  createLogHash(data) {
    return `${data.level}-${data.message}-${data.applicationName}-${data.statusCode}`;
  }
  shouldDebounce(data) {
    if (!this.defaults.debounce) {
      return false;
    }
    const hash = this.createLogHash(data);
    const now = Date.now();
    const lastSent = this.lastLogHash.get(hash) || 0;
    if (now - lastSent < this.defaults.debounce) {
      return true;
    }
    this.lastLogHash.set(hash, now);
    return false;
  }
  async message(logData) {
    this.checkConfiguration();
    const fullLogData = {
      deviceId: this.defaults.deviceId || "",
      applicationName: this.defaults.applicationName,
      statusCode: this.defaults.statusCode,
      level: "INFO" /* INFO */,
      ...logData,
      message: logData.message || ""
    };
    if (!fullLogData.deviceId) {
      throw new Error("deviceId is required for logging");
    }
    if (!fullLogData.message) {
      throw new Error("message is required for logging");
    }
    if (this.shouldDebounce(fullLogData)) {
      return {
        success: true,
        message: "Log debounced"
      };
    }
    return await this.sendLog(fullLogData);
  }
  async sendLog(data) {
    const logPayload = {
      ...data,
      timestamp: formatDate(),
      environment: Deno.env.get("DENO_ENV") || "production"
    };
    try {
      const response = await this.post(`${this.coreInfo?.serviceEndpoint}/logs`, logPayload);
      return response;
    } catch (error) {
      console.error("Failed to send log:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  // Helper methods for different log levels
  async information(logData) {
    return this.message({
      ...logData,
      level: "INFO" /* INFO */
    });
  }
  async delayed(logData) {
    return this.message({
      ...logData,
      level: "DELAYED" /* DELAYED */
    });
  }
  async error(logData) {
    return this.message({
      ...logData,
      level: "ERROR" /* ERROR */
    });
  }
  async critical(logData) {
    return this.message({
      ...logData,
      level: "CRITICAL" /* CRITICAL */
    });
  }
  // Send multiple logs individually (since no batch endpoint exists)
  async batch(logs) {
    this.checkConfiguration();
    try {
      const results = await Promise.all(
        logs.map((log) => this.message(log))
      );
      const failures = results.filter((r) => !r.success);
      if (failures.length === 0) {
        return {
          success: true,
          message: `Successfully sent ${logs.length} logs`
        };
      } else {
        return {
          success: false,
          error: `Failed to send ${failures.length} of ${logs.length} logs`,
          data: { failures }
        };
      }
    } catch (error) {
      console.error("Failed to send batch logs:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  // Clear debounce cache
  clearDebounce() {
    this.lastLogHash.clear();
    if (this.debouncer) {
      this.debouncer.reset();
    }
  }
  // Reset to initial state
  reset() {
    this.clearDebounce();
    this.defaults = {};
    this.debouncer = void 0;
  }
  // Get log statistics
  getStats() {
    return {
      debounceActive: !!this.debouncer,
      cacheSize: this.lastLogHash.size,
      defaults: this.defaults
    };
  }
};
var elogs = new ElevatedLogs();

// lib/iot/index.ts
var ElevatedIOT = class extends BaseService {
  // Event emitters for reactive programming
  onConnected = new EventEmitter();
  onDisconnect = new EventEmitter();
  onConfigRequired = new EventEmitter();
  onCommand = new EventEmitter();
  onFlightInfo = new EventEmitter();
  onRefresh = new EventEmitter();
  onPrint = new EventEmitter();
  onRestart = new EventEmitter();
  onNavigate = new EventEmitter();
  ws = null;
  reconnectTimer = null;
  pingTimer = null;
  reconnectAttempts = 0;
  maxReconnectAttempts = 10;
  reconnectDelay = 1e3;
  iotInfo = { appName: "ElevationDenoService" };
  isConnected = false;
  shouldReconnect = true;
  config(coreInfo, iotInfo) {
    super.config(coreInfo);
    if (!coreInfo.iotEndpoint) {
      throw new Error("iotEndpoint is required in CoreInfo for IOT service");
    }
    if (!coreInfo.fingerPrint) {
      throw new Error("fingerPrint is required in CoreInfo for IOT service");
    }
    if (iotInfo) {
      this.iotInfo = iotInfo;
    }
    this.connect();
  }
  connect() {
    if (!this.coreInfo || !this.coreInfo.iotEndpoint) {
      return;
    }
    try {
      this.disconnect(false);
      const wsUrl = new URL(this.coreInfo.iotEndpoint);
      wsUrl.searchParams.set("token", this.coreInfo.token);
      wsUrl.searchParams.set("fingerprint", this.coreInfo.fingerPrint);
      wsUrl.searchParams.set("appName", this.iotInfo.appName);
      wsUrl.searchParams.set("appVersion", this.iotInfo.appVersion || "1.0.0");
      if (this.coreInfo.secondary) {
        wsUrl.searchParams.set("secondary", "true");
      }
      this.ws = new WebSocket(wsUrl.toString());
      this.ws.onopen = () => this.handleOpen();
      this.ws.onmessage = (event) => this.handleMessage(event);
      this.ws.onclose = (event) => this.handleClose(event);
      this.ws.onerror = (error) => this.handleError(error);
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      this.scheduleReconnect();
    }
  }
  handleOpen() {
    console.log("IOT WebSocket connected");
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.send({
      type: "handshake",
      data: {
        fingerPrint: this.coreInfo.fingerPrint,
        appName: this.iotInfo.appName,
        appVersion: this.iotInfo.appVersion,
        secondary: this.coreInfo.secondary || false
      }
    });
    this.startPing();
  }
  handleMessage(event) {
    try {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "connected":
          this.onConnected.emit();
          break;
        case "config_required":
          this.onConfigRequired.emit();
          break;
        case "command":
          this.onCommand.emit(message.data);
          this.parseSpecialCommands(message.data);
          break;
        case "flight_info":
          this.onFlightInfo.emit(message.data);
          break;
        case "refresh":
          this.onRefresh.emit();
          break;
        case "print":
          this.onPrint.emit(message.data);
          break;
        case "pong":
          break;
        default:
          console.log("Unknown IOT message type:", message.type);
      }
    } catch (error) {
      console.error("Failed to parse IOT message:", error);
    }
  }
  parseSpecialCommands(commands) {
    if (commands.refresh) {
      this.onRefresh.emit();
    }
    if (commands.restart) {
      this.onRestart.emit();
    }
    if (commands.navigate) {
      this.onNavigate.emit(commands.navigate);
    }
    if (commands.print) {
      this.onPrint.emit(commands.print);
    }
    if (commands.flightInfo) {
      this.onFlightInfo.emit(commands.flightInfo);
    }
  }
  handleClose(event) {
    console.log("IOT WebSocket closed:", event.code, event.reason);
    this.isConnected = false;
    this.onDisconnect.emit();
    this.stopPing();
    if (this.shouldReconnect && !event.wasClean) {
      this.scheduleReconnect();
    }
  }
  handleError(error) {
    console.error("IOT WebSocket error:", error);
  }
  scheduleReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }
    this.reconnectAttempts++;
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
      3e4
      // Max 30 seconds
    );
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }
  startPing() {
    this.stopPing();
    this.pingTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({ type: "ping" });
      }
    }, 3e4);
  }
  stopPing() {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
  sendCommand(command) {
    this.send({
      type: "command",
      data: command
    });
  }
  sendEvent(eventType, eventData) {
    this.send({
      type: "event",
      eventType,
      data: eventData
    });
  }
  disconnect(shouldReconnect = false) {
    this.shouldReconnect = shouldReconnect;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopPing();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
  reconnect() {
    this.shouldReconnect = true;
    this.reconnectAttempts = 0;
    this.connect();
  }
  getStatus() {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      endpoint: this.coreInfo?.iotEndpoint
    };
  }
  // Clean up resources
  destroy() {
    this.disconnect(false);
    this.onConnected.clear();
    this.onDisconnect.clear();
    this.onConfigRequired.clear();
    this.onCommand.clear();
    this.onFlightInfo.clear();
    this.onRefresh.clear();
    this.onPrint.clear();
    this.onRestart.clear();
    this.onNavigate.clear();
  }
};
var iot = new ElevatedIOT();

// lib/enrollment/index.ts
var ElevatedEnrollment = class extends BaseService {
  started = false;
  config(coreInfo) {
    super.config(coreInfo);
    if (!coreInfo.fingerPrint) {
      throw new Error("fingerPrint is required in CoreInfo for Enrollment service");
    }
  }
  async start() {
    this.checkConfiguration();
    const response = await this.get(`${this.coreInfo?.serviceEndpoint}/devices/key`);
    if (response.success && response.data) {
      const device = response.data[0];
      if (device.metadata?.configured) {
        throw new Error("Device is already enrolled");
      } else {
        this.started = true;
        return device;
      }
    }
    throw new Error(response.error || "Failed to start enrollment");
  }
  async getLocations() {
    this.checkConfiguration();
    const response = await this.get(`${this.coreInfo?.serviceEndpoint}/locations`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Failed to get locations");
  }
  async getSpecification() {
    this.checkConfiguration();
    const response = await this.get(`${this.coreInfo?.serviceEndpoint}/speficiations`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Failed to get specifications");
  }
  async enrollDevice(info) {
    this.checkConfiguration();
    if (!this.started) {
      throw new Error("start subscription first");
    }
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
        ...info.device.configurations
      };
    }
    const response = await this.patch(`${this.coreInfo?.serviceEndpoint}/devices/${info.device._id}`, info.device);
    return response;
  }
  async isLabelAvailable(label) {
    this.checkConfiguration();
    if (!label) {
      return false;
    }
    const response = await this.get(`${this.coreInfo?.serviceEndpoint}/devices/label/${label}`, {});
    if (response.success && response.data) {
      return response.data.length === 0;
    }
    return false;
  }
};
var enrollment = new ElevatedEnrollment();

// lib/config/index.ts
var ElevatedConfigurations = class extends BaseService {
  configInfo = null;
  config(coreInfo, configInfo) {
    super.config(coreInfo);
    if (configInfo) {
      this.setConfigInfo(configInfo);
    }
  }
  setConfigInfo(configInfo) {
    if (!configInfo.deviceId || !configInfo.locationId) {
      throw new Error("Both deviceId and locationId are required in ElevatedConfigurationsInfo");
    }
    this.configInfo = configInfo;
  }
  checkConfigInfo() {
    if (!this.configInfo) {
      throw new Error("ElevatedConfigurationsInfo not set. Call setConfigInfo() first");
    }
  }
  async getConfig(label) {
    this.checkConfiguration();
    this.checkConfigInfo();
    return this.get(`${this.coreInfo?.serviceEndpoint}/configurations/${label}/${this.configInfo?.locationId}/${this.configInfo?.deviceId}`).then((res) => {
      return res.data || null;
    }).catch((err) => {
      console.error("Error fetching configuration:", err);
      return null;
    });
  }
  async getConfigs(labels) {
    return Promise.all(labels.map((label) => this.getConfig(label)));
  }
};
var elevatedConfigurations = new ElevatedConfigurations();

// lib/cms/index.ts
var CMS = class extends BaseService {
  // Observable for reactive programming (using EventEmitter instead of RxJS)
  stringsObservable = new EventEmitter();
  cmsCache = /* @__PURE__ */ new Map();
  allStrings = null;
  reqHeaderNoCache = { "Cache-Control": "no-cache" };
  config(coreInfo) {
    super.config(coreInfo);
    this.refreshInfo(coreInfo);
  }
  /**
   * Refresh CMS information and reload strings
   */
  refreshInfo(info) {
    this.config(info);
  }
  /**
   * Get a specific key from CMS
   * @param key - The CMS key to retrieve
   * @param lan - Language code (e.g., 'en', 'es', 'fr')
   * @param isConfig - Whether this is a configuration string
   * @returns The CMS string or null if not found
   */
  async getKey(key, lan, isConfig = false) {
    this.checkConfiguration();
    if (!isConfig) {
      const cached = this.cmsCache.get(`${key}-${lan}`);
      const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
      return cached !== void 0 ? cached : cachedLangFallback !== void 0 ? cachedLangFallback : null;
    }
    if (!this.allStrings || this.allStrings.length === 0 || isConfig) {
      await this.loadAllStrings(isConfig);
      const cached = this.cmsCache.get(`${key}-${lan}`);
      const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
      const found = cached !== void 0 ? cached : cachedLangFallback !== void 0 ? cachedLangFallback : null;
      return isConfig && found ? JSON.parse(found) : found;
    }
    return null;
  }
  /**
   * Get a string value directly (convenience method)
   */
  async getString(key, lan) {
    const result = await this.getKey(key, lan, false);
    if (typeof result === "string") {
      return result;
    }
    return result?.content || null;
  }
  /**
   * Get a configuration value
   */
  async getConfig(key, lan) {
    const result = await this.getKey(key, lan, true);
    if (typeof result === "string") {
      return result;
    }
    return result?.content || null;
  }
  /**
   * Load all CMS strings for the organization
   */
  async loadAllStrings(disableCache = false) {
    this.checkConfiguration();
    try {
      const response = await this.get(`${this.coreInfo?.serviceEndpoint}/strings`, disableCache ? this.reqHeaderNoCache : void 0);
      if (response.success && response.data) {
        this.allStrings = response.data;
        this.stringsObservable.emit(this.allStrings);
        this.updateCacheFromStrings(this.allStrings);
      }
    } catch (error) {
      console.error("Failed to load CMS strings:", error);
      this.stringsObservable.emit(null);
    }
  }
  /**
   * Get all loaded strings
   */
  getAllStrings() {
    return this.allStrings;
  }
  /**
   * Clear the local cache
   */
  clearCache() {
    this.cmsCache.clear();
  }
  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cmsCache.size,
      keys: Array.from(this.cmsCache.keys())
    };
  }
  /**
   * Private method to update cache from loaded strings
   */
  updateCacheFromStrings(strings) {
    for (const cms2 of strings) {
      for (const [langCode, langData] of Object.entries(cms2.languages)) {
        const publishedVersion = langData.versions.find((v) => v.published) || langData.versions[0];
        if (publishedVersion) {
          const cacheKey = `${cms2.element}-${langCode}`;
          this.cmsCache.set(cacheKey, publishedVersion.string);
        }
      }
    }
  }
  /**
   * Clean up resources
   */
  destroy() {
    this.clearCache();
    this.stringsObservable.clear();
    this.allStrings = null;
  }
};
var cms = new CMS();

// lib/touchpoint/index.ts
var TouchPoint = class extends BaseService {
  touchPointId = null;
  getDeviceByFingerPrint() {
    this.checkConfiguration();
    if (!this.coreInfo?.fingerPrint) {
      throw new Error("Device fingerprint is required for TouchPoint service");
    }
    return this.get(`${this.coreInfo?.serviceEndpoint}/devices/key/${this.coreInfo.fingerPrint}`).then((res) => {
      if (res.data?.length) {
        const tp = res.data[0];
        if (tp)
          this.touchPointId = tp._id;
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
  async getInfo() {
    return this.getDeviceByFingerPrint();
  }
  /**
   * Set the device in service or out of service
   * @param state - true for in-service, false for out-of-service
   * @param reason - Reason for the state change
   */
  async inService(state, reason) {
    this.checkConfiguration();
    if (!this.coreInfo?.fingerPrint) {
      throw new Error("Device fingerprint is required for TouchPoint service");
    }
    try {
      if (!this.touchPointId) {
        await this.getDeviceByFingerPrint();
      }
      if (!this.touchPointId) {
        return;
      }
      await this.post(`${this.coreInfo.serviceEndpoint}/devices/service`, {
        id: this.touchPointId,
        state,
        reason
      });
    } catch (error) {
      console.error(`Unable to transition to state: ${state} ${error}`);
    }
  }
};
var touchPoint = new TouchPoint();

// index.ts
var ElevationService = class {
  events = events;
  logs = elogs;
  iot = iot;
  enrollment = enrollment;
  config = elevatedConfigurations;
  cms = cms;
  touchPoint = touchPoint;
  initialize(coreInfo) {
    this.events.config(coreInfo);
    this.logs.config(coreInfo);
    this.enrollment.config(coreInfo);
    this.cms.config(coreInfo);
    this.touchPoint.config(coreInfo);
    if (coreInfo.iotEndpoint && coreInfo.fingerPrint) {
      this.iot.config(coreInfo);
    }
  }
};
