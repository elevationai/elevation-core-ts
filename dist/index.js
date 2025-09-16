// types/enums/event-code.ts
var EventCode = /* @__PURE__ */ ((EventCode2) => {
  EventCode2[EventCode2["PNR_RETRIEVAL"] = 1] = "PNR_RETRIEVAL";
  EventCode2[EventCode2["BAGTAG_PRINT"] = 2] = "BAGTAG_PRINT";
  EventCode2[EventCode2["PAPER_LOW"] = 3] = "PAPER_LOW";
  EventCode2[EventCode2["PAPER_OUT"] = 4] = "PAPER_OUT";
  EventCode2[EventCode2["UPPER_DOOR_OPEN"] = 5] = "UPPER_DOOR_OPEN";
  EventCode2[EventCode2["UPPER_DOOR_CLOSED"] = 6] = "UPPER_DOOR_CLOSED";
  EventCode2[EventCode2["LOWER_DOOR_OPEN"] = 7] = "LOWER_DOOR_OPEN";
  EventCode2[EventCode2["LOWER_DOOR_CLOSED"] = 8] = "LOWER_DOOR_CLOSED";
  EventCode2[EventCode2["PASS_SCANNED"] = 9] = "PASS_SCANNED";
  EventCode2[EventCode2["ONLINE"] = 10] = "ONLINE";
  EventCode2[EventCode2["OFFLINE"] = 11] = "OFFLINE";
  EventCode2[EventCode2["IN_SERVICE"] = 12] = "IN_SERVICE";
  EventCode2[EventCode2["OUT_OF_SERVICE"] = 13] = "OUT_OF_SERVICE";
  EventCode2[EventCode2["PAPER_JAM"] = 14] = "PAPER_JAM";
  EventCode2[EventCode2["TOO_LATE_FOR_FLIGHT"] = 15] = "TOO_LATE_FOR_FLIGHT";
  EventCode2[EventCode2["TOO_EARLY_FOR_FLIGHT"] = 16] = "TOO_EARLY_FOR_FLIGHT";
  EventCode2[EventCode2["INCORRECT_LOCATION"] = 17] = "INCORRECT_LOCATION";
  EventCode2[EventCode2["RESERVATION_NOT_FOUND"] = 18] = "RESERVATION_NOT_FOUND";
  EventCode2[EventCode2["BOARDING_PASS_INVALID"] = 19] = "BOARDING_PASS_INVALID";
  EventCode2[EventCode2["NOT_CHECKED_IN"] = 120] = "NOT_CHECKED_IN";
  EventCode2[EventCode2["INELIGIBLE"] = 121] = "INELIGIBLE";
  EventCode2[EventCode2["INTERNATIONAL"] = 122] = "INTERNATIONAL";
  EventCode2[EventCode2["PREVIOUSLY_PRINTED"] = 123] = "PREVIOUSLY_PRINTED";
  EventCode2[EventCode2["NO_BAGS"] = 64] = "NO_BAGS";
  EventCode2[EventCode2["WRONG_AIRLINE"] = 65] = "WRONG_AIRLINE";
  EventCode2[EventCode2["PRINTER_FAILURE"] = 66] = "PRINTER_FAILURE";
  EventCode2[EventCode2["UNAUTHORIZED_CROSSING_ENTRANCE"] = 20] = "UNAUTHORIZED_CROSSING_ENTRANCE";
  EventCode2[EventCode2["UNAUTHORIZED_CROSSING_EXIT"] = 21] = "UNAUTHORIZED_CROSSING_EXIT";
  EventCode2[EventCode2["FRAUD_CRAWLING"] = 22] = "FRAUD_CRAWLING";
  EventCode2[EventCode2["FRAUD_JUMP"] = 23] = "FRAUD_JUMP";
  EventCode2[EventCode2["UNAUTHORIZED_STANDING_AT_ENTRANCE"] = 24] = "UNAUTHORIZED_STANDING_AT_ENTRANCE";
  EventCode2[EventCode2["UNAUTHORIZED_STANDING_AT_EXIT"] = 25] = "UNAUTHORIZED_STANDING_AT_EXIT";
  EventCode2[EventCode2["STOP_IN_GATE"] = 26] = "STOP_IN_GATE";
  EventCode2[EventCode2["ONE_BOARD_ONE_LEFT_ENTRANCE"] = 27] = "ONE_BOARD_ONE_LEFT_ENTRANCE";
  EventCode2[EventCode2["TWO_BOARDED"] = 28] = "TWO_BOARDED";
  EventCode2[EventCode2["ONE_BOARDED_ONE_CROSSED"] = 29] = "ONE_BOARDED_ONE_CROSSED";
  EventCode2[EventCode2["ONE_CROSSED_LEFT_ENTRANCE"] = 30] = "ONE_CROSSED_LEFT_ENTRANCE";
  EventCode2[EventCode2["ONE_BOARDED_THEN_LEFT_VIA_ENTRANCE"] = 31] = "ONE_BOARDED_THEN_LEFT_VIA_ENTRANCE";
  EventCode2[EventCode2["BOARDED_WITHOUT_AUTHORIZATION"] = 32] = "BOARDED_WITHOUT_AUTHORIZATION";
  EventCode2[EventCode2["CROSSING_ENTRANCE_TIMEOUT"] = 33] = "CROSSING_ENTRANCE_TIMEOUT";
  EventCode2[EventCode2["CROSSING_EXIT_TIMEOUT"] = 34] = "CROSSING_EXIT_TIMEOUT";
  EventCode2[EventCode2["EXIT_NOT_CLEARED_TIMEOUT"] = 35] = "EXIT_NOT_CLEARED_TIMEOUT";
  EventCode2[EventCode2["GATE_ENTRY_TIMEOUT"] = 36] = "GATE_ENTRY_TIMEOUT";
  EventCode2[EventCode2["GATE_CROSSING_TIMEOUT"] = 37] = "GATE_CROSSING_TIMEOUT";
  EventCode2[EventCode2["MANTRAP_VALIDATION_TIMEOUT"] = 38] = "MANTRAP_VALIDATION_TIMEOUT";
  EventCode2[EventCode2["EXIT_AREA_CLEAR"] = 39] = "EXIT_AREA_CLEAR";
  EventCode2[EventCode2["EXIT_AREA_OCCUPIED"] = 40] = "EXIT_AREA_OCCUPIED";
  EventCode2[EventCode2["SELF_BOARDING_COMPLETE"] = 41] = "SELF_BOARDING_COMPLETE";
  EventCode2[EventCode2["NO_PASS_FIRST_SENSOR"] = 42] = "NO_PASS_FIRST_SENSOR";
  EventCode2[EventCode2["NO_PASS_LAST_SENSOR"] = 43] = "NO_PASS_LAST_SENSOR";
  EventCode2[EventCode2["BOARDING_CANCELED"] = 44] = "BOARDING_CANCELED";
  EventCode2[EventCode2["SENSOR_FAILURE"] = 45] = "SENSOR_FAILURE";
  EventCode2[EventCode2["FLAPS_FAILURE"] = 46] = "FLAPS_FAILURE";
  EventCode2[EventCode2["PAPER_RESTOCK"] = 47] = "PAPER_RESTOCK";
  EventCode2[EventCode2["SESSION_TIME"] = 48] = "SESSION_TIME";
  EventCode2[EventCode2["ALARM"] = 49] = "ALARM";
  EventCode2[EventCode2["EXIT_BLOCKED"] = 50] = "EXIT_BLOCKED";
  EventCode2[EventCode2["INCORRECT_GATE"] = 51] = "INCORRECT_GATE";
  EventCode2[EventCode2["GATE_OPEN"] = 52] = "GATE_OPEN";
  EventCode2[EventCode2["GATE_CLOSED"] = 53] = "GATE_CLOSED";
  EventCode2[EventCode2["GATE_AUTHORIZED"] = 54] = "GATE_AUTHORIZED";
  EventCode2[EventCode2["EMERGENCY"] = 55] = "EMERGENCY";
  EventCode2[EventCode2["MAINTENANCE"] = 56] = "MAINTENANCE";
  EventCode2[EventCode2["BOARDING_PASS_PREVIOUSLY_USED"] = 57] = "BOARDING_PASS_PREVIOUSLY_USED";
  EventCode2[EventCode2["GATE_INOPERABLE"] = 58] = "GATE_INOPERABLE";
  EventCode2[EventCode2["GATE_EMPLOYEE_AUTHORIZED"] = 59] = "GATE_EMPLOYEE_AUTHORIZED";
  EventCode2[EventCode2["FREESTATE"] = 60] = "FREESTATE";
  EventCode2[EventCode2["CONTROLSTATE"] = 61] = "CONTROLSTATE";
  EventCode2[EventCode2["PRMMODE"] = 62] = "PRMMODE";
  EventCode2[EventCode2["AIRLINE_PASS"] = 63] = "AIRLINE_PASS";
  EventCode2[EventCode2["BOARDING_PASS_PRINT"] = 68] = "BOARDING_PASS_PRINT";
  EventCode2[EventCode2["APPLICATION_AVAILABLE"] = 69] = "APPLICATION_AVAILABLE";
  EventCode2[EventCode2["APPLICATION_UNAVAILABLE"] = 70] = "APPLICATION_UNAVAILABLE";
  EventCode2[EventCode2["APPLICATION_ACTIVE"] = 71] = "APPLICATION_ACTIVE";
  EventCode2[EventCode2["APPLICATION_STOP"] = 72] = "APPLICATION_STOP";
  EventCode2[EventCode2["PASSPORT_SCANNED"] = 73] = "PASSPORT_SCANNED";
  EventCode2[EventCode2["BAGTAG_PRINTER_ONLINE"] = 74] = "BAGTAG_PRINTER_ONLINE";
  EventCode2[EventCode2["BAGTAG_PRINTER_OFFLINE"] = 75] = "BAGTAG_PRINTER_OFFLINE";
  EventCode2[EventCode2["BARCODE_READER_ONLINE"] = 76] = "BARCODE_READER_ONLINE";
  EventCode2[EventCode2["BARCODE_READER_OFFLINE"] = 77] = "BARCODE_READER_OFFLINE";
  EventCode2[EventCode2["PASSPORT_READER_ONLINE"] = 78] = "PASSPORT_READER_ONLINE";
  EventCode2[EventCode2["PASSPORT_READER_OFFLINE"] = 79] = "PASSPORT_READER_OFFLINE";
  EventCode2[EventCode2["BOARDINGPASS_PRINTER_ONLINE"] = 90] = "BOARDINGPASS_PRINTER_ONLINE";
  EventCode2[EventCode2["BOARDINGPASS_PRINTER_OFFLINE"] = 91] = "BOARDINGPASS_PRINTER_OFFLINE";
  EventCode2[EventCode2["BOARDINGPASS_PRINTER_PAPER_OUT"] = 92] = "BOARDINGPASS_PRINTER_PAPER_OUT";
  EventCode2[EventCode2["BOARDINGPASS_PRINTER_PAPER_LOW"] = 93] = "BOARDINGPASS_PRINTER_PAPER_LOW";
  EventCode2[EventCode2["BOARDINGPASS_PRINTER_PAPER_JAM"] = 94] = "BOARDINGPASS_PRINTER_PAPER_JAM";
  EventCode2[EventCode2["BOARDINGPASS_PRINTER_PAPER_RESTOCK"] = 95] = "BOARDINGPASS_PRINTER_PAPER_RESTOCK";
  EventCode2[EventCode2["BOARDINGPASS_PRINTER_FAILURE"] = 96] = "BOARDINGPASS_PRINTER_FAILURE";
  EventCode2[EventCode2["CONFIGURATION_REQUESTED"] = 103] = "CONFIGURATION_REQUESTED";
  EventCode2[EventCode2["CONFIGURATION_COMPLETED"] = 110] = "CONFIGURATION_COMPLETED";
  EventCode2[EventCode2["PASSENGER_CHECK_IN"] = 104] = "PASSENGER_CHECK_IN";
  EventCode2[EventCode2["PASSENGER_CHECK_IN_FAILED"] = 105] = "PASSENGER_CHECK_IN_FAILED";
  EventCode2[EventCode2["BAGTAG_PRINT_FAILURE"] = 106] = "BAGTAG_PRINT_FAILURE";
  EventCode2[EventCode2["APPLICATION_ACTIVE_ACCESSIBLE"] = 108] = "APPLICATION_ACTIVE_ACCESSIBLE";
  EventCode2[EventCode2["APPLICATION_INITIALIZE"] = 109] = "APPLICATION_INITIALIZE";
  EventCode2[EventCode2["CARDREADER_ONLINE"] = 111] = "CARDREADER_ONLINE";
  EventCode2[EventCode2["CARDREADER_OFFLINE"] = 112] = "CARDREADER_OFFLINE";
  EventCode2[EventCode2["CARDREADER_FAILURE"] = 113] = "CARDREADER_FAILURE";
  EventCode2[EventCode2["CARDREADER_READ"] = 114] = "CARDREADER_READ";
  EventCode2[EventCode2["ANNOUNCEMENT_ONLINE"] = 115] = "ANNOUNCEMENT_ONLINE";
  EventCode2[EventCode2["ANNOUNCEMENT_OFFLINE"] = 116] = "ANNOUNCEMENT_OFFLINE";
  EventCode2[EventCode2["KEYPAD_ONLINE"] = 117] = "KEYPAD_ONLINE";
  EventCode2[EventCode2["KEYPAD_OFFLINE"] = 118] = "KEYPAD_OFFLINE";
  EventCode2[EventCode2["ILLUMINATION_ONLINE"] = 119] = "ILLUMINATION_ONLINE";
  EventCode2[EventCode2["ILLUMINATION_OFFLINE"] = 124] = "ILLUMINATION_OFFLINE";
  EventCode2[EventCode2["HEADSET_ONLINE"] = 125] = "HEADSET_ONLINE";
  EventCode2[EventCode2["HEADSET_OFFLINE"] = 126] = "HEADSET_OFFLINE";
  EventCode2[EventCode2["FEEDER_ONLINE"] = 127] = "FEEDER_ONLINE";
  EventCode2[EventCode2["FEEDER_OFFLINE"] = 128] = "FEEDER_OFFLINE";
  EventCode2[EventCode2["DISPENSER_ONLINE"] = 129] = "DISPENSER_ONLINE";
  EventCode2[EventCode2["DISPENSER_OFFLINE"] = 130] = "DISPENSER_OFFLINE";
  EventCode2[EventCode2["NO_DOCV"] = 131] = "NO_DOCV";
  EventCode2[EventCode2["DOCS_VERIFIED_PRINTING_ALLOWED"] = 132] = "DOCS_VERIFIED_PRINTING_ALLOWED";
  EventCode2[EventCode2["GROUP_BOOKING_NOT_SUPPORTED"] = 135] = "GROUP_BOOKING_NOT_SUPPORTED";
  EventCode2[EventCode2["ERROR_GENERIC"] = 400] = "ERROR_GENERIC";
  EventCode2[EventCode2["USER_LOGIN"] = 107] = "USER_LOGIN";
  EventCode2[EventCode2["TEST_ENV"] = 215] = "TEST_ENV";
  EventCode2[EventCode2["AGENT_LOGIN_ACTIVATION"] = 200] = "AGENT_LOGIN_ACTIVATION";
  EventCode2[EventCode2["AGENT_LOGOUT_ACTIVATION"] = 201] = "AGENT_LOGOUT_ACTIVATION";
  EventCode2[EventCode2["PAX_ACTIVATION_TIME"] = 202] = "PAX_ACTIVATION_TIME";
  EventCode2[EventCode2["BAG_TAG_NOT_FOUND"] = 204] = "BAG_TAG_NOT_FOUND";
  EventCode2[EventCode2["EXPIRED_DRIVERS_LICENSE"] = 205] = "EXPIRED_DRIVERS_LICENSE";
  EventCode2[EventCode2["VALID_DRIVERS_LICENSE"] = 206] = "VALID_DRIVERS_LICENSE";
  EventCode2[EventCode2["NOT_PART_OF_RESERVATION"] = 207] = "NOT_PART_OF_RESERVATION";
  EventCode2[EventCode2["ID_MATCH_NOT_FOUND"] = 208] = "ID_MATCH_NOT_FOUND";
  EventCode2[EventCode2["BAG_ALREADY_ACTIVATED"] = 209] = "BAG_ALREADY_ACTIVATED";
  EventCode2[EventCode2["UNABLE_TO_ACTIVATE_BAG"] = 210] = "UNABLE_TO_ACTIVATE_BAG";
  EventCode2[EventCode2["INVALID_BAGTAG"] = 216] = "INVALID_BAGTAG";
  EventCode2[EventCode2["BOARDED"] = 211] = "BOARDED";
  EventCode2[EventCode2["BEGIN_BOARDING_FAILED"] = 212] = "BEGIN_BOARDING_FAILED";
  EventCode2[EventCode2["BOARDING_ENDED"] = 213] = "BOARDING_ENDED";
  EventCode2[EventCode2["BOARDING_FAILED"] = 214] = "BOARDING_FAILED";
  EventCode2[EventCode2["INVALID_BOARDING_PASS"] = 217] = "INVALID_BOARDING_PASS";
  EventCode2[EventCode2["FLIGHT_SCANNED_MISMATCH"] = 218] = "FLIGHT_SCANNED_MISMATCH";
  EventCode2[EventCode2["SCANNED_WITHOUT_STARTING"] = 219] = "SCANNED_WITHOUT_STARTING";
  EventCode2[EventCode2["BOARDING_STARTED"] = 220] = "BOARDING_STARTED";
  EventCode2[EventCode2["ZONING_ATTEMPT_FAILED"] = 221] = "ZONING_ATTEMPT_FAILED";
  EventCode2[EventCode2["ZONING_CHNAGE"] = 222] = "ZONING_CHNAGE";
  EventCode2[EventCode2["ZONING_TIME"] = 223] = "ZONING_TIME";
  EventCode2[EventCode2["FLIGHT_ROOM_JOINED"] = 224] = "FLIGHT_ROOM_JOINED";
  EventCode2[EventCode2["FLIGHT_ROOM_LEFT"] = 225] = "FLIGHT_ROOM_LEFT";
  EventCode2[EventCode2["MANIFEST_SUCCESS"] = 226] = "MANIFEST_SUCCESS";
  EventCode2[EventCode2["MANIFEST_ERROR"] = 227] = "MANIFEST_ERROR";
  EventCode2[EventCode2["SOCKET_COMMAND"] = 228] = "SOCKET_COMMAND";
  EventCode2[EventCode2["REQUEST_PROFILING"] = 203] = "REQUEST_PROFILING";
  EventCode2[EventCode2["FAILED_TO_READ_BAG_TAG"] = 300] = "FAILED_TO_READ_BAG_TAG";
  EventCode2[EventCode2["BAG_TAG_FOUND"] = 301] = "BAG_TAG_FOUND";
  EventCode2[EventCode2["BAG_SETTLED"] = 302] = "BAG_SETTLED";
  EventCode2[EventCode2["BAG_AT_ENTRY"] = 303] = "BAG_AT_ENTRY";
  EventCode2[EventCode2["BAG_IN_HOLDING_AREA"] = 304] = "BAG_IN_HOLDING_AREA";
  EventCode2[EventCode2["WAITING_ON_BHS"] = 305] = "WAITING_ON_BHS";
  EventCode2[EventCode2["INTRUSION_DETECTED"] = 306] = "INTRUSION_DETECTED";
  EventCode2[EventCode2["NO_BAG_DETECTED"] = 307] = "NO_BAG_DETECTED";
  EventCode2[EventCode2["TRYING_TO_ACQUIRE_BAG_TAG"] = 308] = "TRYING_TO_ACQUIRE_BAG_TAG";
  EventCode2[EventCode2["BAG_RELEASED"] = 309] = "BAG_RELEASED";
  EventCode2[EventCode2["MOVE_TO_HOLDING_AREA"] = 310] = "MOVE_TO_HOLDING_AREA";
  EventCode2[EventCode2["CANCEL_NEED_INTERVENTION"] = 311] = "CANCEL_NEED_INTERVENTION";
  EventCode2[EventCode2["CANCEL_PASSENGER_CAN_FIX"] = 312] = "CANCEL_PASSENGER_CAN_FIX";
  EventCode2[EventCode2["MULTIPLE_BAG_TAGS_ERROR"] = 313] = "MULTIPLE_BAG_TAGS_ERROR";
  EventCode2[EventCode2["MULTIPLE_BAGS_ERROR"] = 314] = "MULTIPLE_BAGS_ERROR";
  EventCode2[EventCode2["HOLDING_AREA_FULL"] = 315] = "HOLDING_AREA_FULL";
  EventCode2[EventCode2["BAG_CANNOT_RELEASE"] = 316] = "BAG_CANNOT_RELEASE";
  EventCode2[EventCode2["BAG_CANNOT_PROCESS"] = 317] = "BAG_CANNOT_PROCESS";
  EventCode2[EventCode2["CONVEY_BELT_INOPERABLE"] = 318] = "CONVEY_BELT_INOPERABLE";
  EventCode2[EventCode2["UNKNOWN_SBD_ERROR"] = 319] = "UNKNOWN_SBD_ERROR";
  EventCode2[EventCode2["BAG_OVER_LENGTH"] = 320] = "BAG_OVER_LENGTH";
  EventCode2[EventCode2["BAG_OVER_HEIGHT"] = 321] = "BAG_OVER_HEIGHT";
  EventCode2[EventCode2["BAG_JAMMED_INSIDE"] = 322] = "BAG_JAMMED_INSIDE";
  EventCode2[EventCode2["UNEXPECTED_BAG_IN_REAR"] = 323] = "UNEXPECTED_BAG_IN_REAR";
  EventCode2[EventCode2["BAG_TOO_FLAT"] = 324] = "BAG_TOO_FLAT";
  EventCode2[EventCode2["BAG_TOO_SHORT"] = 325] = "BAG_TOO_SHORT";
  EventCode2[EventCode2["BAG_OVERWEIGHT"] = 326] = "BAG_OVERWEIGHT";
  EventCode2[EventCode2["BAG_UNDERWEIGHT"] = 327] = "BAG_UNDERWEIGHT";
  EventCode2[EventCode2["BAG_NOT_SETTLED"] = 328] = "BAG_NOT_SETTLED";
  EventCode2[EventCode2["BAG_NOT_CONVEYABLE"] = 329] = "BAG_NOT_CONVEYABLE";
  EventCode2[EventCode2["BHS_OFFLINE"] = 330] = "BHS_OFFLINE";
  EventCode2[EventCode2["BHS_BUSY"] = 331] = "BHS_BUSY";
  EventCode2[EventCode2["FRONT_BAG_BLOCKING_REAR_RETURN"] = 332] = "FRONT_BAG_BLOCKING_REAR_RETURN";
  EventCode2[EventCode2["TECHNICAL_ERROR"] = 333] = "TECHNICAL_ERROR";
  EventCode2[EventCode2["BAG_UNEXPECTEDLY_REMOVED"] = 334] = "BAG_UNEXPECTEDLY_REMOVED";
  return EventCode2;
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
  refreshInfo(info) {
    this.config(info);
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
  post(path, data) {
    return this.makeRequest(path, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  patch(path, data) {
    return this.makeRequest(path, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
  }
  get(path, headers) {
    return this.makeRequest(path, {
      method: "GET",
      headers
    });
  }
  put(path, data) {
    return this.makeRequest(path, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  delete(path) {
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
      if (fullEventData.eventData && fullEventData.eventData.airline) {
        metaData.airline = fullEventData.eventData.airline;
      }
      if (fullEventData.eventData && fullEventData.eventData.countryCode) {
        metaData.countryCode = fullEventData.eventData.countryCode;
      }
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
  success(eventData) {
    return this.send({
      ...eventData,
      statusCode: 200 /* SUCCESS */
    });
  }
  failure(eventData) {
    return this.send({
      ...eventData,
      statusCode: 400 /* FAILURE */
    });
  }
  error(eventData) {
    return this.send({
      ...eventData,
      statusCode: 400 /* FAILURE */
    });
  }
  critical(eventData) {
    return this.send({
      ...eventData,
      statusCode: 500 /* CRITICAL_FAILURE */
    });
  }
  infraction(eventData) {
    return this.send({
      ...eventData,
      statusCode: 501 /* INFRACTION */
    });
  }
  timeout(eventData) {
    return this.send({
      ...eventData,
      statusCode: 502 /* TIMEOUT */
    });
  }
  modeChange(eventData) {
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
      const response = await this.post(`/logs`, logPayload);
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
  information(logData) {
    return this.message({
      ...logData,
      level: "INFO" /* INFO */
    });
  }
  delayed(logData) {
    return this.message({
      ...logData,
      level: "DELAYED" /* DELAYED */
    });
  }
  error(logData) {
    return this.message({
      ...logData,
      level: "ERROR" /* ERROR */
    });
  }
  critical(logData) {
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

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from2.length, ar; i < l; i++) {
      if (ar || !(i in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                _a.call(_parentage_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
              _b.call(_finalizers_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/config.js
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
  return x;
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subject.js
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/empty.js
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
function isScheduler(value) {
  return value && isFunction(value.schedule);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/args.js
function last(arr) {
  return arr[arr.length - 1];
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
  return isFunction(input[observable]);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          if (false)
            return [3, 8];
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done)
            return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
          _a.call(iterable_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
            return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
            return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2)
            throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator2;
    executeSchedule(subscriber, scheduler, function() {
      iterator2 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator2.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
    };
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/from.js
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/of.js
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
var EmptyError = createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/firstValueFrom.js
function firstValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var subscriber = new SafeSubscriber({
      next: function(value) {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: function() {
        if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/map.js
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/catchError.js
function catchError(selector) {
  return operate(function(source, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
      handledResult = innerFrom(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/share.js
function share(options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.connector, connector = _a === void 0 ? function() {
    return new Subject();
  } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
  return function(wrapperSource) {
    var connection;
    var resetConnection;
    var subject;
    var refCount = 0;
    var hasCompleted = false;
    var hasErrored = false;
    var cancelReset = function() {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = void 0;
    };
    var reset = function() {
      cancelReset();
      connection = subject = void 0;
      hasCompleted = hasErrored = false;
    };
    var resetAndUnsubscribe = function() {
      var conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    };
    return operate(function(source, subscriber) {
      refCount++;
      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }
      var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(function() {
        refCount--;
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);
      if (!connection && refCount > 0) {
        connection = new SafeSubscriber({
          next: function(value) {
            return dest.next(value);
          },
          error: function(err) {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          },
          complete: function() {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }
        });
        innerFrom(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}
function handleReset(reset, on) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  if (on === true) {
    reset();
    return;
  }
  if (on === false) {
    return;
  }
  var onSubscriber = new SafeSubscriber({
    next: function() {
      onSubscriber.unsubscribe();
      reset();
    }
  });
  return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}

// ../../../Library/Caches/deno/deno_esbuild/registry.npmjs.org/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/tap.js
function tap(observerOrNext, error, complete) {
  var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? operate(function(source, subscriber) {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, function() {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, function(err) {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, function() {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity;
}

// lib/iot/index.ts
var ElevatedIOT = class extends BaseService {
  ws = null;
  // Event subjects for reactive programming with RxJS
  onConnected = new Subject();
  onDisconnect = new Subject();
  onConfigurationRequired = new Subject();
  onCommand = new Subject();
  onFlightInfo = new Subject();
  onRefresh = new Subject();
  onPrint = new Subject();
  onRestart = new Subject();
  onEvent = new Subject();
  onlineKiosks = new Subject();
  reconnectTimer;
  pingTimer;
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
  refreshInfo(info) {
    this.config(info);
  }
  connect() {
    if (!this.coreInfo || !this.coreInfo.iotEndpoint) {
      return;
    }
    try {
      this.disconnect(false);
      const wsUrl = new URL(`${this.coreInfo.iotEndpoint}${this.coreInfo.iotEvents ? "/events" : "/kiosk"}`);
      wsUrl.searchParams.set("token", this.coreInfo.token);
      wsUrl.searchParams.set("key", this.coreInfo.fingerPrint);
      wsUrl.searchParams.set("app", this.iotInfo.appName);
      wsUrl.searchParams.set("version", this.iotInfo.appVersion || "1.0.0");
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
    this.onConnected.next();
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
        case "command":
          this.onCommand.next(message.data);
          break;
        case "flightinfo":
          this.onFlightInfo.next(message.data);
          break;
        case "event":
          this.onEvent.next(message.data);
          break;
        case "refresh":
          this.onRefresh.next();
          break;
        case "onlineKiosks":
          this.onlineKiosks.next(message.data);
          break;
        case "print":
          this.onPrint.next(message.data);
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
  handleClose(event) {
    console.log("IOT WebSocket closed:", event.code, event.reason);
    this.isConnected = false;
    this.onDisconnect.next();
    this.stopPing();
    if (this.shouldReconnect && !event.wasClean) {
      this.scheduleReconnect();
    }
  }
  handleError(error) {
    console.error("IOT WebSocket error:", error);
    if (/5000/gi.test(error?.message) || /5001/gi.test(error?.toString())) {
      console.error(`[ERROR] [${(/* @__PURE__ */ new Date()).toLocaleString()}] Configuration error received`);
      this.onConfigurationRequired.next();
      this.disconnect(true);
    }
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
    const response = await this.get(`/devices/key`);
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
    const response = await this.get(`/locations`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "Failed to get locations");
  }
  async getSpecification() {
    this.checkConfiguration();
    const response = await this.get(`/speficiations`);
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
    const response = await this.patch(`/devices/${info.device._id}`, info.device);
    return response;
  }
  async isLabelAvailable(label) {
    this.checkConfiguration();
    if (!label) {
      return false;
    }
    const response = await this.get(`/devices/label/${label}`, {});
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
  getConfig(label) {
    this.checkConfiguration();
    this.checkConfigInfo();
    return this.get(
      `/configurations/${label}/${this.configInfo?.locationId}/${this.configInfo?.deviceId}`
    ).then((res) => {
      return res.data || null;
    }).catch((err) => {
      console.error("Error fetching configuration:", err);
      return null;
    });
  }
  getConfigs(labels) {
    return Promise.all(labels.map((label) => this.getConfig(label)));
  }
};
var elevatedConfigurations = new ElevatedConfigurations();

// lib/cms/index.ts
var CMS = class extends BaseService {
  stringsObservable = null;
  cmsCache = /* @__PURE__ */ new Map();
  allStrings = null;
  reqHeaderNoCache = { "Cache-Control": "no-cache" };
  /**
   * Get a specific key from CMS
   * @param key - The CMS key to retrieve
   * @param lan - Language code (e.g., 'en', 'es', 'fr')
   * @param isConfig - Whether this is a configuration string
   * @returns The CMS string or null if not found
   */
  async getKey(key, lan, isConfig = false, allowCache = true) {
    this.checkConfiguration();
    if (allowCache && this.allStrings?.length) {
      const cached = this.cmsCache.get(`${key}-${lan}`);
      const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
      const found = cached !== void 0 ? cached : cachedLangFallback !== void 0 ? cachedLangFallback : null;
      return isConfig && found ? JSON.parse(found) : found;
    }
    if (!allowCache || !this.allStrings?.length) {
      try {
        await firstValueFrom(this.loadAllStrings(isConfig));
      } catch (error) {
        console.error("Failed to load strings for key lookup:", error);
      }
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
  getString(key, lan, allowCache = true) {
    return this.getKey(key, lan, false, allowCache);
  }
  /**
   * Get a configuration value
   */
  getConfig(key, lan, allowCache = true) {
    return this.getKey(key, lan, true, allowCache);
  }
  /**
   * Load all CMS strings for the organization
   * Returns an Observable that is shared when called multiple times rapidly
   */
  loadAllStrings(disableCache = false) {
    this.checkConfiguration();
    if (!disableCache && this.stringsObservable) {
      return this.stringsObservable;
    }
    if (!disableCache && this.allStrings && this.allStrings.length > 0) {
      return of(this.allStrings);
    }
    this.stringsObservable = from(
      this.get(
        `/strings`,
        disableCache ? this.reqHeaderNoCache : void 0
      )
    ).pipe(
      map((response) => {
        if (!response.success || !response.data) {
          throw new Error("Failed to load CMS strings");
        }
        return response.data;
      }),
      tap((data) => {
        this.allStrings = data;
        this.updateCacheFromStrings(this.allStrings);
      }),
      catchError((error) => {
        console.error("Failed to load CMS strings:", error);
        this.stringsObservable = null;
        return EMPTY;
      }),
      // Share the observable among multiple subscribers
      share(),
      tap({
        complete: () => {
          setTimeout(() => {
            this.stringsObservable = null;
          }, 0);
        }
      })
    );
    return this.stringsObservable;
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
    return this.get(`/devices/key/${this.coreInfo.fingerPrint}`).then((res) => {
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
  getInfo() {
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
      await this.post(`/devices/service`, {
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
export {
  CMS,
  Cache,
  Debouncer,
  ElevatedConfigurations,
  ElevatedEnrollment,
  ElevatedEvents,
  ElevatedIOT,
  ElevatedLogs,
  ElevationService,
  EventCode,
  EventMode,
  EventType,
  LogLevel,
  StatusCode,
  TouchPoint,
  cms,
  elevatedConfigurations,
  elogs,
  enrollment,
  events,
  iot,
  touchPoint,
  uuid
};
