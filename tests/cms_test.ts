import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertNotEquals } from "@std/assert";
import { CMSClient, type ICMS, type Language } from "../lib/cms.ts";
import { createCoreInfo, MockFetch } from "./_mock.ts";

function createCmsData(element: string, langs: Record<string, string>): ICMS {
  const languages: Record<string, Language> = {};
  for (const [code, value] of Object.entries(langs)) {
    languages[code] = {
      versions: [{
        name: "base",
        created: new Date(),
        displayDates: [],
        order: 0,
        string: value,
        modified: new Date(),
        publishes: [{ published: new Date(), string: value, author: { id: "a1", displayName: "Test", email: "t@t.com" } }],
      }],
    };
  }
  return { _id: `cms-${element}`, area: "test", page: "test", element, languages, organization: "org-1" };
}

describe("CMSClient", () => {
  let cms: CMSClient;
  let mockFetch: MockFetch;

  beforeEach(() => {
    mockFetch = new MockFetch();
    mockFetch.install();
    cms = CMSClient.create(createCoreInfo());
  });

  afterEach(() => {
    mockFetch.restore();
    mockFetch.reset();
    cms.destroy();
  });

  describe("loadAllStrings()", () => {
    it("should GET /strings", async () => {
      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hello" })]);

      await cms.loadAllStrings();

      assertEquals(mockFetch.requests.length, 1);
      assertEquals(mockFetch.lastUrl!.endsWith("/strings"), true);
      assertEquals(mockFetch.lastMethod, "GET");
    });

    it("should GET /strings/page/{pageName} when pageName is set", async () => {
      cms = CMSClient.create(createCoreInfo({ pageName: "home" }));
      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hello" })]);

      await cms.loadAllStrings();

      assertEquals(mockFetch.lastUrl!.endsWith("/strings/page/home"), true);
    });

    it("should cache result so second call does not fetch", async () => {
      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hello" })]);

      await cms.loadAllStrings();
      await cms.loadAllStrings();

      assertEquals(mockFetch.requests.length, 1);
    });

    it("should deduplicate concurrent calls (only 1 fetch)", async () => {
      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hello" })]);

      const p1 = cms.loadAllStrings();
      const p2 = cms.loadAllStrings();
      await Promise.all([p1, p2]);

      assertEquals(mockFetch.requests.length, 1);
    });

    it("should refresh when disableCache=true", async () => {
      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hello" })]);
      await cms.loadAllStrings();

      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hi" })]);
      await cms.loadAllStrings(true);

      assertEquals(mockFetch.requests.length, 2);
    });
  });

  describe("getKey()", () => {
    it("should return cached value for matching language", async () => {
      mockFetch.queueResponse([createCmsData("title", { "en-US": "Welcome", "es-MX": "Bienvenidos" })]);

      const result = await cms.getKey("title", "es-MX");

      assertEquals(result, "Bienvenidos");
    });

    it("should fall back to en-US when requested language not found", async () => {
      mockFetch.queueResponse([createCmsData("title", { "en-US": "Welcome" })]);

      const result = await cms.getKey("title", "fr-FR");

      assertEquals(result, "Welcome");
    });

    it("should return null for nonexistent key", async () => {
      mockFetch.queueResponse([createCmsData("title", { "en-US": "Welcome" })]);

      const result = await cms.getKey("missing-key", "en-US");

      assertEquals(result, null);
    });

    it("should parse JSON string when isConfig=true", async () => {
      const configValue = JSON.stringify({ theme: "dark", fontSize: 14 });
      mockFetch.queueResponse([createCmsData("app-config", { "en-US": configValue })]);

      const result = await cms.getKey("app-config", "en-US", true);

      // getKey returns string|null but JSON.parse produces an object at runtime
      assertEquals(result as unknown, { theme: "dark", fontSize: 14 });
    });
  });

  describe("getKeys()", () => {
    it("should return array of values", async () => {
      mockFetch.queueResponse([
        createCmsData("title", { "en-US": "Welcome" }),
        createCmsData("subtitle", { "en-US": "Hello World" }),
      ]);

      const results = await cms.getKeys(["title", "subtitle"], "en-US");

      assertEquals(results, ["Welcome", "Hello World"]);
    });
  });

  describe("getString() and getConfig()", () => {
    it("getString should return raw value", async () => {
      mockFetch.queueResponse([createCmsData("label", { "en-US": "Click here" })]);

      const result = await cms.getString("label", "en-US");

      assertEquals(result, "Click here");
    });

    it("getConfig should parse JSON value", async () => {
      const jsonStr = JSON.stringify({ enabled: true });
      mockFetch.queueResponse([createCmsData("feature-flag", { "en-US": jsonStr })]);

      const result = await cms.getConfig("feature-flag", "en-US");

      assertEquals(result as unknown, { enabled: true });
    });
  });

  describe("getLangs()", () => {
    it("should return unique language codes", async () => {
      mockFetch.queueResponse([
        createCmsData("title", { "en-US": "Welcome", "es-MX": "Bienvenidos" }),
        createCmsData("subtitle", { "en-US": "Hello", "fr-FR": "Bonjour" }),
      ]);

      const langs = await cms.getLangs();

      assertEquals(langs.sort(), ["en-US", "es-MX", "fr-FR"].sort());
    });
  });

  describe("clearCache()", () => {
    it("should empty the cache", async () => {
      mockFetch.queueResponse([createCmsData("title", { "en-US": "Hello" })]);
      await cms.loadAllStrings();

      assertNotEquals(cms.getCacheStats().size, 0);

      cms.clearCache();

      assertEquals(cms.getCacheStats().size, 0);
    });
  });

  describe("getCacheStats()", () => {
    it("should return size and keys after loading", async () => {
      mockFetch.queueResponse([createCmsData("title", { "en-US": "Hello" })]);
      await cms.loadAllStrings();

      const stats = cms.getCacheStats();

      assertEquals(stats.size, 1);
      assertEquals(stats.keys, ["title-en-US"]);
    });
  });

  describe("destroy()", () => {
    it("should clear cache and nullify allStrings", async () => {
      mockFetch.queueResponse([createCmsData("title", { "en-US": "Hello" })]);
      await cms.loadAllStrings();

      assertNotEquals(cms.getAllStrings(), null);

      cms.destroy();

      assertEquals(cms.getCacheStats().size, 0);
      assertEquals(cms.getAllStrings(), null);
    });
  });

  describe("version selection", () => {
    it("should use named version when coreInfo.version matches", async () => {
      cms = CMSClient.create(createCoreInfo({ version: "v2" }));

      const cmsData = createCmsData("title", { "en-US": "base-value" });
      // Add a named version "v2" alongside the base version
      cmsData.languages["en-US"].versions.push({
        name: "v2",
        created: new Date(),
        displayDates: [],
        order: 1,
        string: "v2-draft-value",
        modified: new Date(),
        publishes: [{ published: new Date(), string: "v2-published-value", author: { id: "a1", displayName: "Test", email: "t@t.com" } }],
      });
      mockFetch.queueResponse([cmsData]);

      const result = await cms.getString("title", "en-US");

      assertEquals(result, "v2-published-value");
    });
  });

  describe("isDraft", () => {
    it("should use draft string (version.string) instead of published", async () => {
      cms = CMSClient.create(createCoreInfo({ isDraft: true }));

      const cmsData: ICMS = {
        _id: "cms-draft-test",
        area: "test",
        page: "test",
        element: "draft-elem",
        organization: "org-1",
        languages: {
          "en-US": {
            versions: [{
              name: "base",
              created: new Date(),
              displayDates: [],
              order: 0,
              string: "draft-string",
              modified: new Date(),
              publishes: [
                { published: new Date(), string: "published-string", author: { id: "a1", displayName: "Test", email: "t@t.com" } },
              ],
            }],
          },
        },
      };
      mockFetch.queueResponse([cmsData]);

      const result = await cms.getString("draft-elem", "en-US");

      assertEquals(result, "draft-string");
    });
  });

  describe("textReplaces", () => {
    it("should apply find/replace substitutions", async () => {
      cms = CMSClient.create(createCoreInfo({ textReplaces: [{ find: "World", replace: "Deno" }] }));

      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hello World" })]);

      const result = await cms.getString("greeting", "en-US");

      assertEquals(result, "Hello Deno");
    });

    it("should apply multiple textReplaces in sequence", async () => {
      cms = CMSClient.create(createCoreInfo({
        textReplaces: [
          { find: "Hello", replace: "Hi" },
          { find: "World", replace: "Earth" },
        ],
      }));

      mockFetch.queueResponse([createCmsData("greeting", { "en-US": "Hello World" })]);

      const result = await cms.getString("greeting", "en-US");

      assertEquals(result, "Hi Earth");
    });
  });
});
