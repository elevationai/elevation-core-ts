import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertNotEquals } from "@std/assert";
import { FakeTime } from "@std/testing/time";
import { Cache, Debouncer, deepClone, isValidEmail, uuid } from "../lib/shared/utils.ts";

describe("uuid", () => {
  it("should return a valid UUID v4 format", () => {
    const id = uuid();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertEquals(uuidRegex.test(id), true);
  });

  it("should return unique values on successive calls", () => {
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();
    assertNotEquals(id1, id2);
    assertNotEquals(id2, id3);
    assertNotEquals(id1, id3);
  });
});

describe("isValidEmail", () => {
  it("should accept valid email addresses", () => {
    assertEquals(isValidEmail("user@example.com"), true);
    assertEquals(isValidEmail("first.last@domain.org"), true);
    assertEquals(isValidEmail("user+tag@sub.domain.co"), true);
  });

  it("should reject email without @", () => {
    assertEquals(isValidEmail("userexample.com"), false);
  });

  it("should reject email without domain", () => {
    assertEquals(isValidEmail("user@"), false);
  });

  it("should reject email with spaces", () => {
    assertEquals(isValidEmail("user @example.com"), false);
    assertEquals(isValidEmail("us er@example.com"), false);
  });

  it("should reject empty string", () => {
    assertEquals(isValidEmail(""), false);
  });

  it("should reject email without TLD", () => {
    assertEquals(isValidEmail("user@domain"), false);
  });
});

describe("deepClone", () => {
  it("should return primitives as-is", () => {
    assertEquals(deepClone(42), 42);
    assertEquals(deepClone("hello"), "hello");
    assertEquals(deepClone(true), true);
    assertEquals(deepClone(null), null);
    assertEquals(deepClone(undefined), undefined);
  });

  it("should clone nested objects with reference independence", () => {
    const original = { a: 1, b: { c: 2, d: { e: 3 } } };
    const cloned = deepClone(original);

    assertEquals(cloned, original);

    cloned.b.c = 99;
    assertEquals(original.b.c, 2);

    cloned.b.d.e = 100;
    assertEquals(original.b.d.e, 3);
  });

  it("should clone arrays with reference independence", () => {
    const original = [1, [2, 3], [4, [5]]];
    const cloned = deepClone(original);

    assertEquals(cloned, original);

    (cloned[1] as number[])[0] = 99;
    assertEquals((original[1] as number[])[0], 2);
  });

  it("should clone Date instances", () => {
    const original = new Date("2025-01-15T12:00:00Z");
    const cloned = deepClone(original);

    assertEquals(cloned.getTime(), original.getTime());
    assertEquals(cloned instanceof Date, true);

    cloned.setFullYear(2030);
    assertEquals(original.getFullYear(), 2025);
  });

  it("should handle null correctly", () => {
    assertEquals(deepClone(null), null);
  });
});

describe("Cache", () => {
  it("should set and get values", () => {
    const cache = new Cache<string>(60000, false);
    cache.set("key1", "value1");
    assertEquals(cache.get("key1"), "value1");
  });

  it("should return undefined for missing keys", () => {
    const cache = new Cache<string>(60000, false);
    assertEquals(cache.get("nonexistent"), undefined);
  });

  it("should expire entries after TTL using FakeTime", () => {
    const time = new FakeTime();
    try {
      const cache = new Cache<string>(1000, false);
      cache.set("key1", "value1");
      assertEquals(cache.get("key1"), "value1");

      time.tick(500);
      assertEquals(cache.get("key1"), "value1");

      time.tick(501);
      assertEquals(cache.get("key1"), undefined);
    }
    finally {
      time.restore();
    }
  });

  it("should support custom TTL per entry", () => {
    const time = new FakeTime();
    try {
      const cache = new Cache<string>(60000, false);
      cache.set("short", "value", 500);
      cache.set("long", "value", 5000);

      time.tick(600);
      assertEquals(cache.get("short"), undefined);
      assertEquals(cache.get("long"), "value");
    }
    finally {
      time.restore();
    }
  });

  it("should report has correctly", () => {
    const cache = new Cache<string>(60000, false);
    cache.set("key1", "value1");
    assertEquals(cache.has("key1"), true);
    assertEquals(cache.has("missing"), false);
  });

  it("should delete entries", () => {
    const cache = new Cache<string>(60000, false);
    cache.set("key1", "value1");
    assertEquals(cache.delete("key1"), true);
    assertEquals(cache.get("key1"), undefined);
  });

  it("should clear all entries", () => {
    const cache = new Cache<string>(60000, false);
    cache.set("a", "1");
    cache.set("b", "2");
    cache.clear();
    assertEquals(cache.get("a"), undefined);
    assertEquals(cache.get("b"), undefined);
  });

  it("should stop cleanup interval on destroy", () => {
    const time = new FakeTime();
    try {
      const cache = new Cache<string>(1000, true);
      cache.set("key1", "value1");
      cache.destroy();
      assertEquals(cache.get("key1"), undefined);
    }
    finally {
      time.restore();
    }
  });
});

describe("Debouncer", () => {
  it("should execute the first call immediately", () => {
    const time = new FakeTime();
    try {
      const calls: number[] = [];
      const debouncer = new Debouncer((val: number) => calls.push(val), 1000);

      debouncer.call(1);
      assertEquals(calls, [1]);
    }
    finally {
      time.restore();
    }
  });

  it("should block rapid calls within the delay period", () => {
    const time = new FakeTime();
    try {
      const calls: number[] = [];
      const debouncer = new Debouncer((val: number) => calls.push(val), 1000);

      debouncer.call(1);
      debouncer.call(2);
      debouncer.call(3);
      assertEquals(calls, [1]);
    }
    finally {
      time.restore();
    }
  });

  it("should allow execution after the delay period elapses", () => {
    const time = new FakeTime();
    try {
      const calls: number[] = [];
      const debouncer = new Debouncer((val: number) => calls.push(val), 1000);

      debouncer.call(1);
      assertEquals(calls, [1]);

      time.tick(1001);
      debouncer.call(2);
      assertEquals(calls, [1, 2]);
    }
    finally {
      time.restore();
    }
  });

  it("should allow re-execution after reset", () => {
    const time = new FakeTime();
    try {
      const calls: number[] = [];
      const debouncer = new Debouncer((val: number) => calls.push(val), 1000);

      debouncer.call(1);
      assertEquals(calls, [1]);

      debouncer.reset();
      debouncer.call(2);
      assertEquals(calls, [1, 2]);
    }
    finally {
      time.restore();
    }
  });

  it("should return the function result from callAsync", async () => {
    const time = new FakeTime();
    try {
      const debouncer = new Debouncer((val: number) => val * 10, 1000);

      const result = await debouncer.callAsync(5);
      assertEquals(result, 50);
    }
    finally {
      time.restore();
    }
  });

  it("should return undefined from callAsync when debounced", async () => {
    const time = new FakeTime();
    try {
      const debouncer = new Debouncer((val: number) => val * 10, 1000);

      await debouncer.callAsync(5);
      const result = await debouncer.callAsync(6);
      assertEquals(result, undefined);
    }
    finally {
      time.restore();
    }
  });
});
