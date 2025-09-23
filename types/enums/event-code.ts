/**
 * Generics Event Codes - The following should mostly be generic for all devices
 * @readonly
 * @enum
 * @property {number} PNR_RETRIEVAL
 * @property {number} BAGTAG_PRINT
 * @property {number} PAPER_LOW
 * @property {number} PAPER_OUT
 * @property {number} UPPER_DOOR_OPEN
 * @property {number} UPPER_DOOR_CLOSED
 * @property {number} LOWER_DOOR_OPEN
 * @property {number} LOWER_DOOR_CLOSED
 * @property {number} PASS_SCANNED
 * @property {number} ONLINE
 * @property {number} OFFLINE
 * @property {number} IN_SERVICE
 * @property {number} OUT_OF_SERVICE
 * @property {number} PAPER_JAM
 * @property {number} TOO_LATE_FOR_FLIGHT
 * @property {number} TOO_EARLY_FOR_FLIGHT
 * @property {number} INCORRECT_LOCATION
 * @property {number} RESERVATION_NOT_FOUND
 * @property {number} BOARDING_PASS_INVALID
 * @property {number} NOT_CHECKED_IN
 * @property {number} INELIGIBLE
 * @property {number} INTERNATIONAL
 * @property {number} PREVIOUSLY_PRINTED
 * @property {number} NO_BAGS
 * @property {number} WRONG_AIRLINE
 * @property {number} PRINTER_FAILURE
 * @property {number} UNAUTHORIZED_CROSSING_ENTRANCE
 * @property {number} UNAUTHORIZED_CROSSING_EXIT
 * @property {number} FRAUD_CRAWLING
 * @property {number} FRAUD_JUMP
 * @property {number} UNAUTHORIZED_STANDING_AT_ENTRANCE
 * @property {number} UNAUTHORIZED_STANDING_AT_EXIT
 * @property {number} STOP_IN_GATE
 * @property {number} ONE_BOARD_ONE_LEFT_ENTRANCE
 * @property {number} TWO_BOARDED
 * @property {number} ONE_BOARDED_ONE_CROSSED
 * @property {number} ONE_CROSSED_LEFT_ENTRANCE
 * @property {number} ONE_BOARDED_THEN_LEFT_VIA_ENTRANCE
 * @property {number} BOARDED_WITHOUT_AUTHORIZATION
 * @property {number} CROSSING_ENTRANCE_TIMEOUT
 * * */
export enum EventCode {
  PNR_RETRIEVAL = 1,

  BAGTAG_PRINT = 2,

  PAPER_LOW = 3,

  PAPER_OUT = 4,

  UPPER_DOOR_OPEN = 5,

  UPPER_DOOR_CLOSED = 6,

  LOWER_DOOR_OPEN = 7,

  LOWER_DOOR_CLOSED = 8,

  PASS_SCANNED = 9,

  ONLINE = 10,

  OFFLINE = 11,

  IN_SERVICE = 12,

  OUT_OF_SERVICE = 13,

  PAPER_JAM = 14,

  TOO_LATE_FOR_FLIGHT = 15,

  TOO_EARLY_FOR_FLIGHT = 16,

  INCORRECT_LOCATION = 17,

  RESERVATION_NOT_FOUND = 18,

  BOARDING_PASS_INVALID = 19,

  NOT_CHECKED_IN = 120,

  INELIGIBLE = 121,

  INTERNATIONAL = 122,

  PREVIOUSLY_PRINTED = 123,

  NO_BAGS = 64,

  WRONG_AIRLINE = 65,

  PRINTER_FAILURE = 66,

  UNAUTHORIZED_CROSSING_ENTRANCE = 20,

  UNAUTHORIZED_CROSSING_EXIT = 21,

  FRAUD_CRAWLING = 22,

  FRAUD_JUMP = 23,

  UNAUTHORIZED_STANDING_AT_ENTRANCE = 24,

  UNAUTHORIZED_STANDING_AT_EXIT = 25,

  STOP_IN_GATE = 26,

  ONE_BOARD_ONE_LEFT_ENTRANCE = 27,

  TWO_BOARDED = 28,

  ONE_BOARDED_ONE_CROSSED = 29,

  ONE_CROSSED_LEFT_ENTRANCE = 30,

  ONE_BOARDED_THEN_LEFT_VIA_ENTRANCE = 31,

  BOARDED_WITHOUT_AUTHORIZATION = 32,

  CROSSING_ENTRANCE_TIMEOUT = 33,
  /**
   * Crossing From Exit Timeout
   *
   * 01010 - Entry timeout in direction B. A passenger coming from the exit (B side) did not cross the gate in the allotted time
   */
  CROSSING_EXIT_TIMEOUT = 34,
  /**
   * Exit Not Cleared Timeout
   *
   * 01011 - Exit timeout. The exit has not been cleared completely in the allotted time
   */
  EXIT_NOT_CLEARED_TIMEOUT = 35,
  /**
   * Gate Entry Expired
   *
   * 01045 - No Entry timeout. Timeouts during boarding (the person did not enter the gate in the allotted time)
   */
  GATE_ENTRY_TIMEOUT = 36,
  /**
   * Gate Crossing Expired
   *
   * 01046 - No crossing timeout. A passenger coming did not cross the gate in the allotted time
   */
  GATE_CROSSING_TIMEOUT = 37,
  /**
   * Ticket Validation Timeout
   *
   * 01059 Validation timeout. A passenger did not validate his ticket in the mantrap in the allotted time
   */
  MANTRAP_VALIDATION_TIMEOUT = 38,
  /**
   * Exit Area Clear
   *
   * EXOK - Exit area clear. Default value at startup and after mode change. Return to this status when fraud or EXOC is cleared
   */
  EXIT_AREA_CLEAR = 39,
  /**
   * Exit Area Occupied
   *
   * EXOC - Exit area occupied
   */
  EXIT_AREA_OCCUPIED = 40,
  /**
   * Self Boarding Complete
   *
   * QBOK - Passenger completed self boarding and has left the device
   */
  SELF_BOARDING_COMPLETE = 41,
  /**
   * Passenger Did Not Pass First Sensor
   *
   * TODT - Passenger did not pass first sensor in the time specified by Args [ 0 ] of GetSetTempoAEA
   */
  NO_PASS_FIRST_SENSOR = 42,
  /**
   * Passenger did Not Pass Last Sensor
   *
   * TOND - Passenger did not pass last sensor in the time specified by Args [ 1 ] of GetSetTempoAEA.
   */
  NO_PASS_LAST_SENSOR = 43,
  /**
   * Boarding Cancelled
   *
   * CNXB - Passenger left via entrance, boarding canceled
   */
  BOARDING_CANCELED = 44,
  /**
   * Sensor Hardware Failure
   *
   * TEHS - Hardware Failure - Sensor related , overrides normal boarding and fraud status
   */
  SENSOR_FAILURE = 45,
  /**
   * Flaps Hardware Failure
   *
   * TEHF - Hardware Failure - Flaps related , overrides normal boarding and fraud status
   */
  FLAPS_FAILURE = 46,
  /**
   * Bag tag paper restock
   */
  PAPER_RESTOCK = 47,
  /** Session Time
   *
   * An event that holds OUR calculated session time.
   * The session time is from when the pax first enters/scans a PNR till when the completion page finishes
   */
  SESSION_TIME = 48,
  /**
   * Alarm
   *
   * An alarm has been thrown in the airport
   */
  ALARM = 49,
  /**
   * Exit Blocked - (Gate)
   *
   * The exit is blocked
   */
  EXIT_BLOCKED = 50,
  /**
   * Incorrect Gate
   *
   * You are at the wrong gate
   */
  INCORRECT_GATE = 51,
  /**
   * Gate Open - (Gate)
   *
   * The gate is open
   */
  GATE_OPEN = 52,
  /**
   * Gate Close - (Gate)
   *
   * The Gate is closed
   */
  GATE_CLOSED = 53,
  /**
   * Authorized
   *
   * Passenger has been authorized to pass through gate
   */
  GATE_AUTHORIZED = 54,
  /**
   * Emergency
   *
   * An Emergency event has happened and gate is open in both directions
   */
  EMERGENCY = 55,
  /**
   * MAINTENANCE
   *
   * A maintenance event has been thrown and gate is in maintenance mode
   */
  MAINTENANCE = 56,
  /**
   * Boarding Pass Previously Used
   *
   * Boarding Pass has been scanned at a gate within the "no scan" time period,
   * you must wait to scan it again or use a different boarding pass
   */
  BOARDING_PASS_PREVIOUSLY_USED = 57,
  /**
   * Gate Inoperable
   *
   * The gate is currently unusable.
   */
  GATE_INOPERABLE = 58,
  /**
   * Employee Authorized
   *
   * An employee has been authorized to pass through gate.
   */
  GATE_EMPLOYEE_AUTHORIZED = 59,
  /**
   * The GATE allows passengers on eaither direction,
   * without the need to scan a boarding pass.
   */
  FREESTATE = 60,
  /**
   * Default gate mode
   * Passengers need to scan their boarding pass before going through
   * the gate.
   */
  CONTROLSTATE = 61,
  /** */
  PRMMODE = 62,
  /**
   * Airline Pass
   * An airline pass was used to open the gate instead of a boarding pass.
   */
  AIRLINE_PASS = 63,
  /**
   * Boarding pass printed
   */
  BOARDING_PASS_PRINT = 68,

  APPLICATION_AVAILABLE = 69,

  APPLICATION_UNAVAILABLE = 70,

  APPLICATION_ACTIVE = 71,

  APPLICATION_STOP = 72,

  PASSPORT_SCANNED = 73,

  BAGTAG_PRINTER_ONLINE = 74,

  BAGTAG_PRINTER_OFFLINE = 75,

  BARCODE_READER_ONLINE = 76,

  BARCODE_READER_OFFLINE = 77,

  PASSPORT_READER_ONLINE = 78,

  PASSPORT_READER_OFFLINE = 79,

  BOARDINGPASS_PRINTER_ONLINE = 90,

  BOARDINGPASS_PRINTER_OFFLINE = 91,

  BOARDINGPASS_PRINTER_PAPER_OUT = 92,

  BOARDINGPASS_PRINTER_PAPER_LOW = 93,

  BOARDINGPASS_PRINTER_PAPER_JAM = 94,

  BOARDINGPASS_PRINTER_PAPER_RESTOCK = 95,

  BOARDINGPASS_PRINTER_FAILURE = 96,
  /**
   * New Kiosk has been added and requires configuration
   */
  CONFIGURATION_REQUESTED = 103,
  /**
   * Kiosk has been configured
   */
  CONFIGURATION_COMPLETED = 110,

  /**
   * Passenger CheckIn
   */
  PASSENGER_CHECK_IN = 104,
  /**
   * Passenger CheckIn Failed
   */
  PASSENGER_CHECK_IN_FAILED = 105,

  BAGTAG_PRINT_FAILURE = 106,

  APPLICATION_ACTIVE_ACCESSIBLE = 108,

  APPLICATION_INITIALIZE = 109,

  CARDREADER_ONLINE = 111,

  CARDREADER_OFFLINE = 112,

  CARDREADER_FAILURE = 113,

  CARDREADER_READ = 114,

  ANNOUNCEMENT_ONLINE = 115,

  ANNOUNCEMENT_OFFLINE = 116,

  KEYPAD_ONLINE = 117,

  KEYPAD_OFFLINE = 118,

  ILLUMINATION_ONLINE = 119,

  ILLUMINATION_OFFLINE = 124,

  HEADSET_ONLINE = 125,

  HEADSET_OFFLINE = 126,

  FEEDER_ONLINE = 127,

  FEEDER_OFFLINE = 128,

  DISPENSER_ONLINE = 129,

  DISPENSER_OFFLINE = 130,

  NO_DOCV = 131,

  DOCS_VERIFIED_PRINTING_ALLOWED = 132,

  GROUP_BOOKING_NOT_SUPPORTED = 135,

  /**
   * Generic or Unknown Error
   */
  ERROR_GENERIC = 400,

  /*********************************************************************
   * Admin - The following should mostly be for Elevated Admin *
   *********************************************************************/

  /**
   * 	Login Event
   */
  USER_LOGIN = 107,

  /**********************************************************************************
   * Activation - The following should mostly be for Elevated Activation Mobile App *
   **********************************************************************************/
  // ACTIVATION EVENTS
  /**
   * Change to Test Environment
   */
  TEST_ENV = 215,

  /**
   * Agent login event
   */
  AGENT_LOGIN_ACTIVATION = 200,

  /**
   * Agent logout event
   */
  AGENT_LOGOUT_ACTIVATION = 201,

  /**
   * The time a passenger takes from printing a bagtag from the kiosk
   * to dropping the bag through an agent
   */
  PAX_ACTIVATION_TIME = 202,

  /**
   * Tag not found when scanning a bagtag
   */
  BAG_TAG_NOT_FOUND = 204,

  /**
   * Expired Drivers License
   */
  EXPIRED_DRIVERS_LICENSE = 205,

  /**
   * Valid Drivers License
   */
  VALID_DRIVERS_LICENSE = 206,

  /**
   * Bag not part of reservation
   */
  NOT_PART_OF_RESERVATION = 207,

  /**
   * Match not found for ID
   */
  ID_MATCH_NOT_FOUND = 208,

  /**
   * Bag already activated
   */
  BAG_ALREADY_ACTIVATED = 209,

  /**
   * Unable to activate bag
   */
  UNABLE_TO_ACTIVATE_BAG = 210,

  /**
   * Bagtag is invalid
   */
  INVALID_BAGTAG = 216,

  // BOARDING EVENTS
  /**
   * successful boarding
   */
  BOARDED = 211,

  /**
   * begin boarding failed
   */
  BEGIN_BOARDING_FAILED = 212,

  /**
   * end boarding with total boarding time milliseconds
   */
  BOARDING_ENDED = 213,

  /**
   * boarding failed
   */
  BOARDING_FAILED = 214,

  /**
   * invalid boarding pass
   */
  INVALID_BOARDING_PASS = 217,

  /**
   * scanned flight mismatch
   */
  FLIGHT_SCANNED_MISMATCH = 218,

  /**
   * scanned without starting boarding
   */
  SCANNED_WITHOUT_STARTING = 219,

  /**
   * boarding started
   */
  BOARDING_STARTED = 220,

  /**
   * zoning attempt started
   */
  ZONING_ATTEMPT_FAILED = 221,

  /**
   * zoning change
   */
  ZONING_CHNAGE = 222,

  /**
   * zoning time from start from current zone to end
   */
  ZONING_TIME = 223,

  /**
   * device joined iot flight room
   */
  FLIGHT_ROOM_JOINED = 224,

  /**
   * device left iot flight room
   */
  FLIGHT_ROOM_LEFT = 225,

  /**
   * get manifest succeeded
   */
  MANIFEST_SUCCESS = 226,

  /**
   * get manifest failed
   */
  MANIFEST_ERROR = 227,

  /**
   * iot command sent
   */
  SOCKET_COMMAND = 228,

  /*********************************************************************
   * Profiling - The following should mostly be for Elevated Profiling *
   *********************************************************************/

  /**
   * The profiling information capture while making http requests to
   * external API
   */
  REQUEST_PROFILING = 203,

  /*********************************************************************
   * Self Bag Drop (SBD) - The following should mostly be for SBD *
   *********************************************************************/

  /**
   * The SBD failed to read a bag tag
   */
  FAILED_TO_READ_BAG_TAG = 300,

  /**
   * The SBD found a bag tag
   */
  BAG_TAG_FOUND = 301,

  /**
   * The bag has settled on the conveyor/weight scale and is ready for processing
   */
  BAG_SETTLED = 302,

  /**
   * The bag is detected too close to the entry of the conveyor
   * May or may not be an issue depending on if the conveyor can move the bag to the processing area
   */
  BAG_AT_ENTRY = 303,

  /**
   * There is a bag in the holding area of the SBD
   * Not all SBDs have a holding area
   */
  BAG_IN_HOLDING_AREA = 304,

  /**
   * The SBD is done processing and is now waiting on the BHS to release the bag to
   */
  WAITING_ON_BHS = 305,

  /**
   * The SBD detected an intrusion in the processing area
   */
  INTRUSION_DETECTED = 306,

  /**
   * The SBD did not detect a bag on the conveyor
   */
  NO_BAG_DETECTED = 307,

  /**
   * 	An SBD app has issued a CC#P[A|1] command to move the conveyor to attempt to acquire the bag tag
   */
  TRYING_TO_ACQUIRE_BAG_TAG = 308,

  /**
   * An SBD app has issued a CC#R[A|1] command to release the bag to the BHS system
   */
  BAG_RELEASED = 309,

  /**
   * An SBD app has issued a CC#H[A|1] command to move the bag to the holding area
   */
  MOVE_TO_HOLDING_AREA = 310,

  /**
   * An SBD app has issued a CC#C[A|1] command to cancel the transaction due to needing intervention
   */
  CANCEL_NEED_INTERVENTION = 311,

  /**
   * An SBD app has issued a CC#X[A|2] command to cancel the transaction allowing the passenger to fix the issue and restart the process
   */
  CANCEL_PASSENGER_CAN_FIX = 312,

  /**
   * In response to a query (either solicited or unsolicited) the SBD has detected multiple bag tags
   */
  MULTIPLE_BAG_TAGS_ERROR = 313,

  /**
   * Multiple bags have been detected in the SBD
   */
  MULTIPLE_BAGS_ERROR = 314,

  /**
   * The holding area of the SBD is full
   */
  HOLDING_AREA_FULL = 315,

  /**
   * The SBD cannot release the bag to the BHS
   */
  BAG_CANNOT_RELEASE = 316,

  /**
   * The SBD cannot process the bag
   */
  BAG_CANNOT_PROCESS = 317,

  /**
   * The conveyor belt of the SBD is inoperable
   */
  CONVEY_BELT_INOPERABLE = 318,

  /**
   * An unknown error has occurred in the SBD
   */
  UNKNOWN_SBD_ERROR = 319,

  /**
   * The bag is too long for the SBD
   */
  BAG_OVER_LENGTH = 320,

  /**
   * The bag is too tall for the SBD
   */
  BAG_OVER_HEIGHT = 321,

  /**
   * The bag is jammed inside the SBD
   */
  BAG_JAMMED_INSIDE = 322,

  /**
   * The bag is in the rear of the SBD when it should not be
   */
  UNEXPECTED_BAG_IN_REAR = 323,

  /**
   * The bag is too flat for the SBD
   */
  BAG_TOO_FLAT = 324,

  /**
   * The bag is too short for the SBD
   */
  BAG_TOO_SHORT = 325,

  /**
   * The bag is too heavy for the SBD
   */
  BAG_OVERWEIGHT = 326,

  /**
   * The bag is too light for the SBD
   */
  BAG_UNDERWEIGHT = 327,

  /**
   * The bag is not settled on the conveyor/weight scale
   */
  BAG_NOT_SETTLED = 328,

  /**
   * The bag is not conveyable by the SBD
   */
  BAG_NOT_CONVEYABLE = 329,

  /**
   * The BHS system is telling the SBD it is offline
   */
  BHS_OFFLINE = 330,

  /**
   * The BHS system is telling the SBD it is busy
   */
  BHS_BUSY = 331,

  /**
   * The front bag is blocking the rear bag from returning
   */
  FRONT_BAG_BLOCKING_REAR_RETURN = 332,

  /**
   * A technical error that requires intervention
   */
  TECHNICAL_ERROR = 333,

  /**
   * The bag was removed from the SBD unexpectedly
   */
  BAG_UNEXPECTEDLY_REMOVED = 334,
}
