import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertRejects, assertThrows } from "@std/assert";
import { createCoreInfo, DenoFsStub, MockFetch } from "./_mock.ts";
import { ElevatedConfigurations } from "../lib/config.ts";

describe("ElevatedConfigurations", () => {
  let svc: ElevatedConfigurations;
  let mockFetch: MockFetch;
  let fs: DenoFsStub;

  beforeEach(() => {
    svc = new ElevatedConfigurations();
    mockFetch = new MockFetch();
    mockFetch.install();
    fs = new DenoFsStub();
    fs.install();
  });

  afterEach(() => {
    mockFetch.restore();
    fs.restore();
  });

  describe("setConfigInfo()", () => {
    it("should throw without deviceId", () => {
      svc.config(createCoreInfo());
      assertThrows(
        () => svc.setConfigInfo({ deviceId: "", locationId: "loc-1" }),
        Error,
        "Both deviceId and locationId are required",
      );
    });

    it("should throw without locationId", () => {
      svc.config(createCoreInfo());
      assertThrows(
        () => svc.setConfigInfo({ deviceId: "dev-1", locationId: "" }),
        Error,
        "Both deviceId and locationId are required",
      );
    });
  });

  describe("getConfig()", () => {
    it("should construct the correct URL", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      mockFetch.queueResponse({ setting: "value" });

      await svc.getConfig("app-settings");

      assertEquals(
        mockFetch.lastUrl,
        "https://api.test.com/configurations/app-settings/loc-1/dev-1",
      );
    });

    it("should append version query param when set", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1", version: "2.0" });
      mockFetch.queueResponse({ setting: "value" });

      await svc.getConfig("app-settings");

      assertEquals(
        mockFetch.lastUrl,
        "https://api.test.com/configurations/app-settings/loc-1/dev-1?version=2.0",
      );
    });

    it("should send Cache-Control: no-cache header", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      mockFetch.queueResponse({ setting: "value" });

      await svc.getConfig("app-settings");

      const headers = mockFetch.lastHeaders;
      assertEquals(headers?.["cache-control"], "no-cache");
    });

    it("should return null on error", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      mockFetch.queueResponse({ error: "fail" }, 500);

      const result = await svc.getConfig("bad-label");

      assertEquals(result, null);
    });
  });

  describe("fetchAndCacheConfig()", () => {
    const filePath = "/tmp/test-config.jsonc";

    it("should throw when remote returns null", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      mockFetch.queueResponse({ error: "not found" }, 404);

      await assertRejects(
        () => svc.fetchAndCacheConfig({ label: "missing", filePath }),
        Error,
        'Configuration "missing" returned null',
      );
    });

    it("should write file on first fetch and return firstFetch=true", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      const configData = { theme: "dark", timeout: 30 };
      mockFetch.queueResponse(configData);
      // No existing file in fs stub -> NotFound

      const result = await svc.fetchAndCacheConfig({ label: "ui", filePath });

      assertEquals(result.updated, true);
      assertEquals(result.firstFetch, true);
      assertEquals(result.data, configData);
      assertEquals(fs.writtenFiles.length, 1);
      assertEquals(fs.writtenFiles[0].path, filePath);
      assertEquals(JSON.parse(fs.writtenFiles[0].content), configData);
    });

    it("should return updated=false when content matches", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      const configData = { theme: "dark" };
      mockFetch.queueResponse(configData);
      // Existing local file with same content
      fs.setFile(filePath, JSON.stringify(configData, null, 2));

      const result = await svc.fetchAndCacheConfig({ label: "ui", filePath });

      assertEquals(result.updated, false);
      assertEquals(result.firstFetch, false);
      // No writes should have happened
      assertEquals(fs.writtenFiles.length, 0);
    });

    it("should return updated=true and write when content changed", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      const newData = { theme: "light" };
      mockFetch.queueResponse(newData);
      // Existing local file with different content
      fs.setFile(filePath, JSON.stringify({ theme: "dark" }, null, 2));

      const result = await svc.fetchAndCacheConfig({ label: "ui", filePath });

      assertEquals(result.updated, true);
      assertEquals(result.firstFetch, false);
      assertEquals(result.data, newData);
      assertEquals(fs.writtenFiles.length, 1);
    });

    it("should strip JSONC comments when comparing", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      const configData = { mode: "production" };
      mockFetch.queueResponse(configData);
      // Local file has JSONC comments but same data
      fs.setFile(
        filePath,
        `// This is a comment\n${JSON.stringify(configData, null, 2)}`,
      );

      const result = await svc.fetchAndCacheConfig({ label: "app", filePath });

      assertEquals(result.updated, false);
      assertEquals(result.firstFetch, false);
    });

    it("should create backups on non-first updates", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      const newData = { version: 2 };
      mockFetch.queueResponse(newData);
      // Existing file with old data
      fs.setFile(filePath, JSON.stringify({ version: 1 }, null, 2));

      await svc.fetchAndCacheConfig({ label: "app", filePath, maxBackups: 3 });

      // rotateBackups should have renamed current file to .bak.1
      const renameToBackup = fs.renames.find((r) => r.to === `${filePath}.bak.1`);
      assertEquals(renameToBackup?.from, filePath);
    });

    it("should respect maxBackups=0 and skip backups", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      const newData = { version: 2 };
      mockFetch.queueResponse(newData);
      fs.setFile(filePath, JSON.stringify({ version: 1 }, null, 2));

      await svc.fetchAndCacheConfig({ label: "app", filePath, maxBackups: 0 });

      // No renames should happen
      assertEquals(fs.renames.length, 0);
      // File should still be written
      assertEquals(fs.writtenFiles.length, 1);
    });

    it("should respect force=true even when content matches", async () => {
      svc.config(createCoreInfo(), { deviceId: "dev-1", locationId: "loc-1" });
      const configData = { same: true };
      mockFetch.queueResponse(configData);
      fs.setFile(filePath, JSON.stringify(configData, null, 2));

      const result = await svc.fetchAndCacheConfig({
        label: "app",
        filePath,
        force: true,
      });

      assertEquals(result.updated, true);
      assertEquals(result.firstFetch, false);
      // Should have written the file
      assertEquals(fs.writtenFiles.length, 1);
    });
  });
});
