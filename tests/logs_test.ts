import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertRejects } from "@std/assert";
import { FakeTime } from "@std/testing/time";
import { LogsClient } from "../lib/logs.ts";
import { LogLevel } from "../types/mod.ts";
import { MockFetch } from "./_mock.ts";

describe("LogsClient", () => {
  let logs: LogsClient;
  let mockFetch: MockFetch;

  beforeEach(() => {
    mockFetch = new MockFetch();
    mockFetch.install();
    logs = new LogsClient("https://api.test.com", "test-token-abc123");
  });

  afterEach(() => {
    mockFetch.restore();
    mockFetch.reset();
    logs.reset();
  });

  describe("message()", () => {
    it("should throw if deviceId is missing", async () => {
      await assertRejects(
        () => logs.message({ message: "hello" }),
        Error,
        "deviceId is required",
      );
    });

    it("should throw if message is empty", async () => {
      await assertRejects(
        () => logs.message({ deviceId: "d1", message: "" }),
        Error,
        "message is required",
      );
    });

    it("should POST to /logs endpoint", async () => {
      mockFetch.queueResponse({ success: true });

      await logs.message({ deviceId: "d1", message: "test log" });

      assertEquals(mockFetch.lastUrl!.endsWith("/logs"), true);
      assertEquals(mockFetch.lastMethod, "POST");
    });

    it("should apply defaults from setDefaults", async () => {
      logs.setDefaults({
        deviceId: "default-device",
        applicationName: "TestApp",
      });
      mockFetch.queueResponse({ success: true });

      await logs.message({ message: "test log" });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.deviceId, "default-device");
      assertEquals(body.applicationName, "TestApp");
    });

    it("should default level to INFO", async () => {
      mockFetch.queueResponse({ success: true });

      await logs.message({ deviceId: "d1", message: "test log" });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.level, LogLevel.INFO);
    });
  });

  describe("debouncing", () => {
    it("should debounce identical logs within the debounce window", async () => {
      const time = new FakeTime();
      try {
        logs.setDefaults({ debounce: 5000 });
        mockFetch.queueResponse({ success: true });

        const first = await logs.message({ deviceId: "d1", message: "same message" });
        assertEquals(first.success, true);
        assertEquals(mockFetch.requests.length, 1);

        const second = await logs.message({ deviceId: "d1", message: "same message" });
        assertEquals(second.success, true);
        assertEquals(second.message, "Log debounced");
        assertEquals(mockFetch.requests.length, 1);
      }
      finally {
        time.restore();
      }
    });

    it("should allow different messages to pass through", async () => {
      const time = new FakeTime();
      try {
        logs.setDefaults({ debounce: 5000 });
        mockFetch.queueResponse({ success: true });
        mockFetch.queueResponse({ success: true });

        await logs.message({ deviceId: "d1", message: "message A" });
        assertEquals(mockFetch.requests.length, 1);

        await logs.message({ deviceId: "d1", message: "message B" });
        assertEquals(mockFetch.requests.length, 2);
      }
      finally {
        time.restore();
      }
    });

    it("should allow same message after debounce window elapses", async () => {
      const time = new FakeTime();
      try {
        logs.setDefaults({ debounce: 5000 });
        mockFetch.queueResponse({ success: true });

        await logs.message({ deviceId: "d1", message: "repeated" });
        assertEquals(mockFetch.requests.length, 1);

        time.tick(5001);
        mockFetch.queueResponse({ success: true });

        const result = await logs.message({ deviceId: "d1", message: "repeated" });
        assertEquals(result.success, true);
        assertEquals(mockFetch.requests.length, 2);
      }
      finally {
        time.restore();
      }
    });
  });

  describe("helper methods", () => {
    it("should set level to INFO for information()", async () => {
      mockFetch.queueResponse({ success: true });

      await logs.information({ deviceId: "d1", message: "info log" });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.level, LogLevel.INFO);
    });

    it("should set level to DELAYED for delayed()", async () => {
      mockFetch.queueResponse({ success: true });

      await logs.delayed({ deviceId: "d1", message: "delayed log" });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.level, LogLevel.DELAYED);
    });

    it("should set level to ERROR for error()", async () => {
      mockFetch.queueResponse({ success: true });

      await logs.error({ deviceId: "d1", message: "error log" });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.level, LogLevel.ERROR);
    });

    it("should set level to CRITICAL for critical()", async () => {
      mockFetch.queueResponse({ success: true });

      await logs.critical({ deviceId: "d1", message: "critical log" });

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.level, LogLevel.CRITICAL);
    });
  });

  describe("batch()", () => {
    it("should send all logs and return success message", async () => {
      mockFetch.queueResponse({ success: true });
      mockFetch.queueResponse({ success: true });
      mockFetch.queueResponse({ success: true });

      const result = await logs.batch([
        { deviceId: "d1", message: "log 1" },
        { deviceId: "d1", message: "log 2" },
        { deviceId: "d1", message: "log 3" },
      ]);

      assertEquals(result.success, true);
      assertEquals(result.message, "Successfully sent 3 logs");
    });

    it("should report failures when some logs fail", async () => {
      mockFetch.queueResponse({ success: true }, 200);
      mockFetch.queueResponse({ error: "server error" }, 500);
      mockFetch.queueResponse({ success: true }, 200);

      const result = await logs.batch([
        { deviceId: "d1", message: "ok 1" },
        { deviceId: "d1", message: "fail" },
        { deviceId: "d1", message: "ok 2" },
      ]);

      assertEquals(result.success, false);
      assertEquals(result.error, "Failed to send 1 of 3 logs");
    });
  });

  describe("clearDebounce()", () => {
    it("should allow previously debounced logs to go through after clearing", async () => {
      const time = new FakeTime();
      try {
        logs.setDefaults({ debounce: 5000 });
        mockFetch.queueResponse({ success: true });

        await logs.message({ deviceId: "d1", message: "repeated" });
        assertEquals(mockFetch.requests.length, 1);

        // Still within window, should be debounced
        const debounced = await logs.message({ deviceId: "d1", message: "repeated" });
        assertEquals(debounced.message, "Log debounced");

        logs.clearDebounce();

        // After clearing, the same message should go through
        mockFetch.queueResponse({ success: true });
        const result = await logs.message({ deviceId: "d1", message: "repeated" });
        assertEquals(result.success, true);
        assertEquals(mockFetch.requests.length, 2);
      }
      finally {
        time.restore();
      }
    });
  });

  describe("reset()", () => {
    it("should clear debounce state and defaults", async () => {
      const time = new FakeTime();
      try {
        logs.setDefaults({
          deviceId: "default-d",
          applicationName: "App",
          debounce: 5000,
        });
        mockFetch.queueResponse({ success: true });

        await logs.message({ message: "test" });
        assertEquals(mockFetch.requests.length, 1);

        logs.reset();

        // After reset, defaults are cleared so deviceId must be provided
        await assertRejects(
          () => logs.message({ message: "test" }),
          Error,
          "deviceId is required",
        );
      }
      finally {
        time.restore();
      }
    });
  });

  describe("getStats()", () => {
    it("should report debounceActive and cacheSize", async () => {
      const time = new FakeTime();
      try {
        const initialStats = logs.getStats();
        assertEquals(initialStats.debounceActive, false);
        assertEquals(initialStats.cacheSize, 0);

        logs.setDefaults({ debounce: 5000 });
        mockFetch.queueResponse({ success: true });

        await logs.message({ deviceId: "d1", message: "a log" });

        const afterSendStats = logs.getStats();
        assertEquals(afterSendStats.debounceActive, true);
        assertEquals(afterSendStats.cacheSize, 1);
      }
      finally {
        time.restore();
      }
    });
  });
});
