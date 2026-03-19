import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { createCoreInfo, MockFetch } from "./_mock.ts";
import { BaseService } from "../lib/shared/base.ts";
import type { ApiResponse, CoreInfo } from "../types/mod.ts";

class TestService extends BaseService {
  constructor(coreInfo: CoreInfo) {
    super(coreInfo);
  }
  public testGet<T>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.get<T>(path, headers);
  }
  public testPost<T>(path: string, data: unknown): Promise<ApiResponse<T>> {
    return this.post<T>(path, data);
  }
  public testPut<T>(path: string, data: unknown): Promise<ApiResponse<T>> {
    return this.put<T>(path, data);
  }
  public testPatch<T>(path: string, data: unknown): Promise<ApiResponse<T>> {
    return this.patch<T>(path, data);
  }
  public testDelete<T>(path: string): Promise<ApiResponse<T>> {
    return this.delete<T>(path);
  }
}

describe("BaseService", () => {
  let mockFetch: MockFetch;

  beforeEach(() => {
    mockFetch = new MockFetch();
    mockFetch.install();
  });

  afterEach(() => {
    mockFetch.restore();
  });

  describe("constructor validation", () => {
    it("should throw when token is missing", () => {
      assertThrows(
        () => new TestService(createCoreInfo({ token: "" })),
        Error,
        "Token is required in CoreInfo",
      );
    });

    it("should throw when serviceEndpoint is missing", () => {
      assertThrows(
        () => new TestService(createCoreInfo({ serviceEndpoint: "" })),
        Error,
        "Service endpoint is required in CoreInfo",
      );
    });

    it("should succeed with valid CoreInfo", () => {
      new TestService(createCoreInfo());
    });
  });

  describe("GET requests", () => {
    it("should call the correct URL", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ result: "ok" });

      await service.testGet("/api/test");

      assertEquals(mockFetch.lastUrl, "https://api.test.com/api/test");
    });

    it("should use the GET method", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ result: "ok" });

      await service.testGet("/api/test");

      assertEquals(mockFetch.lastMethod, "GET");
    });

    it("should return a success response with data", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ items: [1, 2, 3] });

      const result = await service.testGet<{ items: number[] }>("/api/items");

      assertEquals(result.success, true);
      assertEquals(result.data, { items: [1, 2, 3] });
    });

    it("should send the Elevated-Auth header as btoa of the token", async () => {
      const service = new TestService(createCoreInfo({ token: "my-secret-token" }));
      mockFetch.queueResponse({ ok: true });

      await service.testGet("/api/test");

      const headers = mockFetch.lastRequest?.init?.headers as Record<string, string>;
      assertEquals(headers["elevated-auth"], btoa("my-secret-token"));
    });
  });

  describe("POST requests", () => {
    it("should use the POST method", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ created: true });

      await service.testPost("/api/items", { name: "test" });

      assertEquals(mockFetch.lastMethod, "POST");
    });

    it("should send the body as JSON", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ created: true });

      const payload = { name: "test", value: 42 };
      await service.testPost("/api/items", payload);

      assertEquals(mockFetch.lastBody, payload);
    });
  });

  describe("PUT requests", () => {
    it("should use the PUT method", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ updated: true });

      await service.testPut("/api/items/1", { name: "updated" });

      assertEquals(mockFetch.lastMethod, "PUT");
    });
  });

  describe("PATCH requests", () => {
    it("should use the PATCH method", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ patched: true });

      await service.testPatch("/api/items/1", { name: "patched" });

      assertEquals(mockFetch.lastMethod, "PATCH");
    });
  });

  describe("DELETE requests", () => {
    it("should use the DELETE method", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ deleted: true });

      await service.testDelete("/api/items/1");

      assertEquals(mockFetch.lastMethod, "DELETE");
    });
  });

  describe("error handling", () => {
    it("should return success: false on HTTP error (404)", async () => {
      const service = new TestService(createCoreInfo());
      mockFetch.queueResponse({ error: "Not Found" }, 404);

      const result = await service.testGet("/api/missing");

      assertEquals(result.success, false);
      assertEquals(result.error, "HTTP error! status: 404");
    });

    it("should return success: false on network failure", async () => {
      const service = new TestService(createCoreInfo());
      // No response queued -- MockFetch will reject with "No response queued"

      const result = await service.testGet("/api/fail");

      assertEquals(result.success, false);
      assertEquals(result.error, "MockFetch: No response queued");
    });
  });
});
