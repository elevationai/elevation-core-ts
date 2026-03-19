import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { FakeTime } from "@std/testing/time";
import { EventsClient } from "../lib/events.ts";
import { EventMode, EventType, StatusCode } from "../types/mod.ts";
import { createDevice, MockFetch } from "./_mock.ts";

describe("EventsClient", () => {
  let events: EventsClient;
  let mockFetch: MockFetch;

  beforeEach(() => {
    mockFetch = new MockFetch();
    mockFetch.install();
    events = new EventsClient("https://api.test.com", "test-token-abc123");
  });

  afterEach(() => {
    mockFetch.restore();
    mockFetch.reset();
    events.reset();
  });

  describe("send()", () => {
    it("should POST to /events endpoint", async () => {
      mockFetch.queueResponse({ success: true });

      await events.send({ eventCode: 100, eventData: {} });

      assertEquals(mockFetch.lastUrl!.endsWith("/events"), true);
      assertEquals(mockFetch.lastMethod, "POST");
    });

    it("should apply defaults from setDefaults", async () => {
      events.setDefaults({
        eventType: EventType.CHECKIN_KIOSK,
        eventMode: EventMode.CUSS,
        ownerID: "owner-123",
      });
      mockFetch.queueResponse({ success: true });

      await events.send({ eventCode: 100, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.eventType, EventType.CHECKIN_KIOSK);
      assertEquals(body.eventMode, EventMode.CUSS);
      assertEquals(body.ownerID, "owner-123");
    });

    it("should auto-populate metaData.eventCode from eventData", async () => {
      mockFetch.queueResponse({ success: true });

      await events.send({ eventCode: 42, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      const metaData = body.metaData as Record<string, unknown>;
      assertEquals(metaData.eventCode, 42);
    });

    it("should auto-populate metaData.airline from eventData.eventData.airline", async () => {
      mockFetch.queueResponse({ success: true });

      await events.send({ eventCode: 100, eventData: { airline: "UA" } });

      const body = mockFetch.lastBody as Record<string, unknown>;
      const metaData = body.metaData as Record<string, unknown>;
      assertEquals(metaData.airline, "UA");
    });

    it("should auto-populate metaData from kiosk Device", async () => {
      mockFetch.queueResponse({ success: true });

      const device = createDevice({
        tags: ["lobby", "intl"],
        location: "loc-abc",
        metadata: { testDevice: true, configured: true },
      });

      await events.send({ eventCode: 100, eventData: {} }, device);

      const body = mockFetch.lastBody as Record<string, unknown>;
      const metaData = body.metaData as Record<string, unknown>;
      assertEquals(metaData.tags, ["lobby", "intl"]);
      assertEquals(metaData.location, "loc-abc");
      assertEquals(metaData.testDevice, true);
    });
  });

  describe("debouncing", () => {
    it("should pass through the first event and debounce the second rapid event", async () => {
      const time = new FakeTime();
      try {
        events.addDebounce([{ eventCode: 100, debounce: 5000 }]);
        mockFetch.queueResponse({ success: true });

        const first = await events.send({ eventCode: 100, eventData: {} });
        assertEquals(first.success, true);
        assertEquals(mockFetch.requests.length, 1);

        const second = await events.send({ eventCode: 100, eventData: {} });
        assertEquals(second.success, true);
        assertEquals(second.message, "Event debounced");
        assertEquals(mockFetch.requests.length, 1);
      }
      finally {
        time.restore();
      }
    });

    it("should allow event through after debounce window elapses", async () => {
      const time = new FakeTime();
      try {
        events.addDebounce([{ eventCode: 100, debounce: 5000 }]);
        mockFetch.queueResponse({ success: true });

        await events.send({ eventCode: 100, eventData: {} });
        assertEquals(mockFetch.requests.length, 1);

        time.tick(5001);
        mockFetch.queueResponse({ success: true });
        const result = await events.send({ eventCode: 100, eventData: {} });
        assertEquals(result.success, true);
        assertEquals(mockFetch.requests.length, 2);
      }
      finally {
        time.restore();
      }
    });

    it("should remove debounceOnce entry after first send", async () => {
      const time = new FakeTime();
      try {
        events.addDebounceOnce([{ eventCode: 200, debounce: 5000 }]);
        mockFetch.queueResponse({ success: true });

        // First send goes through, and since once=true the entry is removed
        const first = await events.send({ eventCode: 200, eventData: {} });
        assertEquals(first.success, true);
        assertEquals(mockFetch.requests.length, 1);

        // Second call within window would be debounced, but entry was deleted
        // so it goes through
        time.tick(5001);
        mockFetch.queueResponse({ success: true });
        const second = await events.send({ eventCode: 200, eventData: {} });
        assertEquals(second.success, true);
        assertEquals(mockFetch.requests.length, 2);
      }
      finally {
        time.restore();
      }
    });

    it("should clear all debounce rules with clearDebounce()", async () => {
      const time = new FakeTime();
      try {
        events.addDebounce([{ eventCode: 100, debounce: 5000 }]);
        mockFetch.queueResponse({ success: true });

        await events.send({ eventCode: 100, eventData: {} });
        assertEquals(mockFetch.requests.length, 1);

        events.clearDebounce();

        // After clearing, the event should pass through even within debounce window
        mockFetch.queueResponse({ success: true });
        const result = await events.send({ eventCode: 100, eventData: {} });
        assertEquals(result.success, true);
        assertEquals(mockFetch.requests.length, 2);
      }
      finally {
        time.restore();
      }
    });
  });

  describe("addDebounce() / addDebounceOnce()", () => {
    it("should register debounce rules via addDebounce", async () => {
      const time = new FakeTime();
      try {
        events.addDebounce([
          { eventCode: 10, debounce: 3000 },
          { eventCode: 20, debounce: 6000 },
        ]);
        mockFetch.queueResponse({ success: true });

        await events.send({ eventCode: 10, eventData: {} });
        const debounced = await events.send({ eventCode: 10, eventData: {} });
        assertEquals(debounced.message, "Event debounced");
      }
      finally {
        time.restore();
      }
    });

    it("should register once rules via addDebounceOnce", async () => {
      const time = new FakeTime();
      try {
        events.addDebounceOnce([{ eventCode: 50, debounce: 3000 }]);
        mockFetch.queueResponse({ success: true });

        // First send goes through and the once entry is removed
        await events.send({ eventCode: 50, eventData: {} });
        assertEquals(mockFetch.requests.length, 1);

        // Second send also goes through because the entry was deleted after first send
        mockFetch.queueResponse({ success: true });
        const second = await events.send({ eventCode: 50, eventData: {} });
        assertEquals(second.success, true);
        assertEquals(mockFetch.requests.length, 2);
      }
      finally {
        time.restore();
      }
    });
  });

  describe("helper methods", () => {
    it("should set statusCode to SUCCESS (200) for success()", async () => {
      mockFetch.queueResponse({ success: true });

      await events.success({ eventCode: 1, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.statusCode, StatusCode.SUCCESS);
    });

    it("should set statusCode to FAILURE (400) for failure()", async () => {
      mockFetch.queueResponse({ success: true });

      await events.failure({ eventCode: 1, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.statusCode, StatusCode.FAILURE);
    });

    it("should set statusCode to FAILURE (400) for error()", async () => {
      mockFetch.queueResponse({ success: true });

      await events.error({ eventCode: 1, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.statusCode, StatusCode.FAILURE);
    });

    it("should set statusCode to CRITICAL_FAILURE (500) for critical()", async () => {
      mockFetch.queueResponse({ success: true });

      await events.critical({ eventCode: 1, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.statusCode, StatusCode.CRITICAL_FAILURE);
    });

    it("should set statusCode to INFRACTION (501) for infraction()", async () => {
      mockFetch.queueResponse({ success: true });

      await events.infraction({ eventCode: 1, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.statusCode, StatusCode.INFRACTION);
    });

    it("should set statusCode to TIMEOUT (502) for timeout()", async () => {
      mockFetch.queueResponse({ success: true });

      await events.timeout({ eventCode: 1, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.statusCode, StatusCode.TIMEOUT);
    });

    it("should set statusCode to MODE_CHANGE (300) for modeChange()", async () => {
      mockFetch.queueResponse({ success: true });

      await events.modeChange({ eventCode: 1, eventData: {} });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.statusCode, StatusCode.MODE_CHANGE);
    });
  });

  describe("reset()", () => {
    it("should clear debounce rules and defaults", async () => {
      const time = new FakeTime();
      try {
        events.setDefaults({
          eventType: EventType.CHECKIN_KIOSK,
          ownerID: "owner-xyz",
          debounceEvent: [{ eventCode: 100, debounce: 5000 }],
        });
        mockFetch.queueResponse({ success: true });

        await events.send({ eventCode: 100, eventData: {} });
        assertEquals(mockFetch.requests.length, 1);

        events.reset();

        // After reset, debounce rules are cleared so event goes through
        mockFetch.queueResponse({ success: true });
        await events.send({ eventCode: 100, eventData: {} });
        assertEquals(mockFetch.requests.length, 2);

        // Defaults should also be cleared (no eventType)
        const body = mockFetch.lastBody as Record<string, unknown>;
        assertEquals(body.eventType, undefined);
        assertEquals(body.ownerID, undefined);
      }
      finally {
        time.restore();
      }
    });
  });
});
