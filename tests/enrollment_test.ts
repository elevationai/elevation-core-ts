import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertRejects, assertThrows } from "@std/assert";
import {
  createCoreInfo,
  createDevice,
  createDeviceInfo,
  createDeviceLocation,
  createSpecification,
  createTerminal,
  MockFetch,
} from "./_mock.ts";
import { ElevatedEnrollment } from "../lib/enrollment.ts";

describe("ElevatedEnrollment", () => {
  let svc: ElevatedEnrollment;
  let mockFetch: MockFetch;

  beforeEach(() => {
    svc = new ElevatedEnrollment();
    mockFetch = new MockFetch();
    mockFetch.install();
  });

  afterEach(() => {
    mockFetch.restore();
  });

  describe("config()", () => {
    it("should throw without fingerPrint", () => {
      assertThrows(
        () => svc.config(createCoreInfo({ fingerPrint: "" })),
        Error,
        "fingerPrint is required in CoreInfo for Enrollment service",
      );
    });

    it("should succeed with fingerPrint", () => {
      svc.config(createCoreInfo({ fingerPrint: "fp-123" }));
      // No error thrown means success
    });
  });

  describe("start()", () => {
    it("should throw when not configured", async () => {
      await assertRejects(
        () => svc.start(),
        Error,
        "Service not configured. Call config() first with CoreInfo",
      );
    });

    it("should return unconfigured device", async () => {
      svc.config(createCoreInfo());
      const device = createDevice({ metadata: { configured: false } });
      mockFetch.queueResponse([device]);

      const result = await svc.start();

      assertEquals(result._id, device._id);
      assertEquals(mockFetch.lastUrl, "https://api.test.com/devices/key/device-fp-001");
    });

    it("should throw 'already enrolled' when metadata.configured is true", async () => {
      svc.config(createCoreInfo());
      const device = createDevice({ metadata: { configured: true } });
      mockFetch.queueResponse([device]);

      await assertRejects(
        () => svc.start(),
        Error,
        "Device is already enrolled",
      );
    });

    it("should throw on API failure", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse({ error: "server error" }, 500);

      await assertRejects(
        () => svc.start(),
        Error,
      );
    });
  });

  describe("getLocations()", () => {
    it("should GET /locations and return data", async () => {
      svc.config(createCoreInfo());
      const locations = [createDeviceLocation()];
      mockFetch.queueResponse(locations);

      const result = await svc.getLocations();

      assertEquals(result, locations);
      assertEquals(mockFetch.lastUrl, "https://api.test.com/locations");
      assertEquals(mockFetch.lastMethod, "GET");
    });
  });

  describe("getSpecification()", () => {
    it("should GET /speficiations (with typo) and return data", async () => {
      svc.config(createCoreInfo());
      const specs = [createSpecification()];
      mockFetch.queueResponse(specs);

      const result = await svc.getSpecification();

      assertEquals(result, specs);
      assertEquals(mockFetch.lastUrl, "https://api.test.com/speficiations");
    });
  });

  describe("isLabelAvailable()", () => {
    it("should return true for empty array response", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([]);

      const result = await svc.isLabelAvailable("NEW-LABEL");

      assertEquals(result, true);
      assertEquals(mockFetch.lastUrl, "https://api.test.com/devices/label/NEW-LABEL");
    });

    it("should return false for non-empty array response", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([createDevice()]);

      const result = await svc.isLabelAvailable("EXISTING-LABEL");

      assertEquals(result, false);
    });

    it("should return false for empty string without making a fetch", async () => {
      svc.config(createCoreInfo());

      const result = await svc.isLabelAvailable("");

      assertEquals(result, false);
      assertEquals(mockFetch.requests.length, 0);
    });
  });

  describe("enrollDevice()", () => {
    it("should throw 'start subscription first' if start() not called", async () => {
      svc.config(createCoreInfo());

      await assertRejects(
        () => svc.enrollDevice(createDeviceInfo()),
        Error,
        "start subscription first",
      );
    });

    it("should throw when label is missing", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([createDevice({ metadata: { configured: false } })]);
      await svc.start();

      await assertRejects(
        () => svc.enrollDevice(createDeviceInfo({ label: "" })),
        Error,
        "Device label is required",
      );
    });

    it("should throw when device._id is missing", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([createDevice({ metadata: { configured: false } })]);
      await svc.start();

      await assertRejects(
        () => svc.enrollDevice(createDeviceInfo({ device: createDevice({ _id: "" }) })),
        Error,
        "Missing Device information",
      );
    });

    it("should throw when location._id is missing", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([createDevice({ metadata: { configured: false } })]);
      await svc.start();

      await assertRejects(
        () => svc.enrollDevice(createDeviceInfo({ location: createDeviceLocation({ _id: "" }) })),
        Error,
        "Location is required",
      );
    });

    it("should throw when terminal._id is missing", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([createDevice({ metadata: { configured: false } })]);
      await svc.start();

      await assertRejects(
        () => svc.enrollDevice(createDeviceInfo({ terminal: createTerminal({ _id: "" }) })),
        Error,
        "Terminal is required",
      );
    });

    it("should throw when specification.id is missing", async () => {
      svc.config(createCoreInfo());
      mockFetch.queueResponse([createDevice({ metadata: { configured: false } })]);
      await svc.start();

      await assertRejects(
        () => svc.enrollDevice(createDeviceInfo({ specification: createSpecification({ id: "" }) })),
        Error,
        "Specification is required",
      );
    });

    it("should throw when label is unavailable", async () => {
      svc.config(createCoreInfo());
      // start() response
      mockFetch.queueResponse([createDevice({ metadata: { configured: false } })]);
      await svc.start();

      // isLabelAvailable returns non-empty array (label taken)
      mockFetch.queueResponse([createDevice()]);

      await assertRejects(
        () => svc.enrollDevice(createDeviceInfo({ label: "TAKEN-LABEL" })),
        Error,
        "Device label 'TAKEN-LABEL' is already in use",
      );
    });

    it("should PATCH /devices/{id} with correct data after full flow", async () => {
      svc.config(createCoreInfo());

      const device = createDevice({ _id: "dev-99", metadata: { configured: false } });
      const location = createDeviceLocation({ _id: "loc-55", configurations: { kiosk: true } });
      const terminal = createTerminal({ _id: "term-77" });
      const specification = createSpecification({ id: "spec-88", model: "K3000" });

      // start() GET response
      mockFetch.queueResponse([device]);
      await svc.start();

      // isLabelAvailable GET response (empty = available)
      mockFetch.queueResponse([]);
      // enrollDevice PATCH response
      mockFetch.queueResponse({ success: true });

      const info = createDeviceInfo({
        label: "MY-DEVICE",
        device,
        location,
        terminal,
        specification,
      });

      await svc.enrollDevice(info);

      // The PATCH request should be the last one
      assertEquals(mockFetch.lastMethod, "PATCH");
      assertEquals(mockFetch.lastUrl, "https://api.test.com/devices/dev-99");

      const body = mockFetch.lastBody as Record<string, unknown>;
      assertEquals(body.label, "MY-DEVICE");
      assertEquals(body.location, "loc-55");
      assertEquals(body.terminal, "term-77");
      assertEquals((body.hardware as Record<string, unknown>).model, "K3000");
    });
  });
});
