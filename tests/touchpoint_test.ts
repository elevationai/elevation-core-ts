import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertRejects } from "@std/assert";
import { createCoreInfo, createDevice, MockFetch } from "./_mock.ts";
import { TouchPoint } from "../lib/touchpoint.ts";

describe("TouchPoint", () => {
  let svc: TouchPoint;
  let mockFetch: MockFetch;

  beforeEach(() => {
    svc = new TouchPoint();
    mockFetch = new MockFetch();
    mockFetch.install();
  });

  afterEach(() => {
    mockFetch.restore();
  });

  describe("getInfo()", () => {
    it("should fetch the correct URL using fingerPrint", async () => {
      svc.config(createCoreInfo({ fingerPrint: "fp-abc" }));
      mockFetch.queueResponse([createDevice()]);

      await svc.getInfo();

      assertEquals(mockFetch.lastUrl, "https://api.test.com/devices/key/fp-abc");
      assertEquals(mockFetch.lastMethod, "GET");
    });

    it("should return the device when found", async () => {
      svc.config(createCoreInfo());
      const device = createDevice({ _id: "dev-42", label: "Kiosk-42" });
      mockFetch.queueResponse([device]);

      const result = await svc.getInfo();

      assertEquals(result?._id, "dev-42");
      assertEquals(result?.label, "Kiosk-42");
    });

    it("should return null when data is empty", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([]);

      const result = await svc.getInfo();

      assertEquals(result, null);
    });

    it("should return null on API error", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse({ error: "server error" }, 500);

      const result = await svc.getInfo();

      assertEquals(result, null);
    });
  });

  describe("inService()", () => {
    it("should throw when fingerPrint is missing", async () => {
      svc.config(createCoreInfo({ fingerPrint: "" }));

      await assertRejects(
        () => svc.inService(true, "starting up"),
        Error,
        "Device fingerprint is required for TouchPoint service",
      );
    });

    it("should fetch device first if touchPointId not cached", async () => {
      svc.config(createCoreInfo());
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
      svc.config(createCoreInfo());
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
      svc.config(createCoreInfo());
      // getDeviceByFingerPrint returns empty array
      mockFetch.queueResponse([]);

      await svc.inService(true, "attempt");

      // Only the GET request; no POST
      assertEquals(mockFetch.requests.length, 1);
    });

    it("should silently catch POST errors", async () => {
      svc.config(createCoreInfo());
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
