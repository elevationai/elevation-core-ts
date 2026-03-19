import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { createDevice, MockFetch } from "./_mock.ts";
import { TouchPointClient } from "../lib/touchpoint.ts";

describe("TouchPointClient", () => {
  let mockFetch: MockFetch;

  beforeEach(() => {
    mockFetch = new MockFetch();
    mockFetch.install();
  });

  afterEach(() => {
    mockFetch.restore();
  });

  describe("create()", () => {
    it("should throw when fingerPrint is missing", () => {
      assertThrows(
        () => new TouchPointClient("https://api.test.com", "test-token", ""),
        Error,
        "Device fingerprint is required for TouchPoint service",
      );
    });
  });

  describe("getInfo()", () => {
    it("should fetch the correct URL using fingerPrint", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "fp-abc");
      mockFetch.queueResponse([createDevice()]);

      await svc.getInfo();

      assertEquals(mockFetch.lastUrl, "https://api.test.com/devices/key/fp-abc");
      assertEquals(mockFetch.lastMethod, "GET");
    });

    it("should return the device when found", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "device-fp-001");
      const device = createDevice({ _id: "dev-42", label: "Kiosk-42" });
      mockFetch.queueResponse([device]);

      const result = await svc.getInfo();

      assertEquals(result?._id, "dev-42");
      assertEquals(result?.label, "Kiosk-42");
    });

    it("should return null when data is empty", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "device-fp-001");
      mockFetch.queueResponse([]);

      const result = await svc.getInfo();

      assertEquals(result, null);
    });

    it("should return null on API error", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "device-fp-001");
      mockFetch.queueResponse({ error: "server error" }, 500);

      const result = await svc.getInfo();

      assertEquals(result, null);
    });
  });

  describe("inService()", () => {
    it("should fetch device first if touchPointId not cached", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "device-fp-001");
      const device = createDevice({ _id: "dev-77" });
      // First request: getDeviceByFingerPrint
      mockFetch.queueResponse([device]);
      // Second request: POST /devices/service
      mockFetch.queueResponse({ success: true });

      await svc.inService(true, "online");

      assertEquals(mockFetch.requests.length, 2);
      assertEquals(mockFetch.requests[0].url, "https://api.test.com/devices/key/device-fp-001");
      assertEquals(mockFetch.requests[1].url, "https://api.test.com/devices/service");
    });

    it("should POST /devices/service with correct payload", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "device-fp-001");
      const device = createDevice({ _id: "dev-77" });
      // Pre-cache the touchPointId via getInfo
      mockFetch.queueResponse([device]);
      await svc.getInfo();

      // Now POST
      mockFetch.queueResponse({ success: true });
      await svc.inService(false, "maintenance");

      assertEquals(mockFetch.lastMethod, "POST");
      assertEquals(mockFetch.lastUrl, "https://api.test.com/devices/service");
      assertEquals(mockFetch.lastBody, {
        id: "dev-77",
        state: false,
        reason: "maintenance",
      });
    });

    it("should silently return if device not found", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "device-fp-001");
      // getDeviceByFingerPrint returns empty array
      mockFetch.queueResponse([]);

      await svc.inService(true, "attempt");

      // Only the GET request; no POST
      assertEquals(mockFetch.requests.length, 1);
    });

    it("should silently catch POST errors", async () => {
      const svc = new TouchPointClient("https://api.test.com", "test-token", "device-fp-001");
      const device = createDevice({ _id: "dev-77" });
      // Pre-cache
      mockFetch.queueResponse([device]);
      await svc.getInfo();

      // POST fails
      mockFetch.queueResponse({ error: "fail" }, 500);

      // Should not throw
      await svc.inService(true, "retry");
    });
  });
});
