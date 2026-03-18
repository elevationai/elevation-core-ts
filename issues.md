# elevation-core-ts: Code Review

## Critical Issues

### 1. Singletons with two-phase initialization

Every module exports a pre-instantiated global singleton (`events`, `elogs`, `iot`, etc.) that starts in a broken state and requires `.config()` before it works. This is Python's `__init__` then `configure()` pattern.

In Deno/TS, you'd either take config in the constructor or use a factory function. Right now consumers have to "just know" to call `config()` first, and `checkConfiguration()` throws at runtime if they forget.

### 2. Silent error swallowing

Nearly every module catches errors and does `console.error()` then returns `null` or continues silently:

- `lib/config/index.ts:41-43` — returns `null` on fetch failure
- `lib/touchpoint/index.ts:22-24` — same
- `lib/cms/index.ts:74-77` — swallows load failure, continues with empty cache
- `lib/events/index.ts:108-114` — returns `{ success: false }` but caller has no idea what happened

This makes debugging a nightmare. Deno convention is to let errors propagate or use `Result` types.

### 3. RxJS where it doesn't belong

- **CMS** wraps a simple HTTP fetch in `from()` → `pipe(map, tap, catchError, share, tap)` then immediately converts it back to a Promise with `firstValueFrom()`. That's a round-trip through RxJS for no benefit — a cached `Promise` with a simple guard would do the same thing.
- **IOT** uses `BehaviorSubject` and `Subject` for event emitting. Deno has `EventTarget` built in, and the consumers (portal, checkin-connect) are just calling `.asObservable().subscribe()` anyway.

The IOT case is more defensible since portal is Angular and RxJS is native there, but it means this library forces an RxJS dependency on every consumer whether they want it or not (like platform-monitor, which is pure Deno).

### 4. No tests

`deno.json` has a test task but there are zero test files in the project.

### 5. `index.ts` barrel files everywhere

Every module is a single file named `index.ts` inside its own directory (`lib/cms/index.ts`, `lib/events/index.ts`, etc.) with no other files in those directories. This is a Node/bundler convention where `index.ts` lets you import from the directory name. Deno's style guide discourages this — `lib/cms.ts` is clearer than `lib/cms/index.ts` when the directory only contains one file.

### 6. Single export entry point

`"exports": "./index.ts"` in `deno.json` means the entire library ships as one giant import. A consumer who only needs `EventCode` (like portal mostly does) pulls in the IOT socket.io client, RxJS, the CMS module, enrollment, logs — everything.

Deno/JSR supports multiple exports:

```jsonc
"exports": {
  ".": "./index.ts",
  "./events": "./lib/events.ts",
  "./iot": "./lib/iot.ts",
  "./cms": "./lib/cms.ts",
  "./types": "./types/index.ts"
}
```

This would let consumers do `import { EventCode } from "@eai/elevation-core-ts/types"` without pulling in socket.io and RxJS. Platform-monitor would particularly benefit — it only uses `EventCode`, `StatusCode`, `touchPoint`, `iot`, and `elevatedConfigurations`, but currently resolves the entire dependency tree.

---

## Medium Issues

### 7. Class inheritance for HTTP plumbing

`BaseService` is an abstract class that every module extends. This is OOP-heavy for what's really just "make an authenticated fetch call." A plain function like `makeAuthenticatedRequest(coreInfo, path, options)` would be simpler, more composable, and more testable.

### 8. Mutable state scattered across classes

`coreInfo`, `configured`, `headers`, `defaults`, `cmsCache`, `allStrings`, `socket`, reconnect state — all mutable instance properties. No `readonly`, no getters. Any consumer can mutate internals.

### 9. The `ElevationService` convenience class

`index.ts:29-54` bundles all singletons into a class with an `initialize()` method. This is the Python "god object" pattern. It doesn't add value over importing individual modules.

---

## Minor Issues

### 10. Typo in endpoint

`lib/enrollment/index.ts:49` hits `/speficiations` (misspelled).

### 11. Broken URL construction

`lib/config/index.ts:34-36` has a template literal with a newline embedded in the URL path, which would produce a malformed URL.

### 12. Race condition in CMS

`lib/cms/index.ts:219-224` uses `setTimeout(() => { this.stringsObservable = null }, 0)` to clear a shared observable. Another request arriving in that tick window gets the stale observable.

### 13. `_id` fields

MongoDB-style `_id` leaked into the TypeScript interfaces rather than mapping to `id` at the API boundary.

---

## What's Fine

- `fetch` + `AbortController` for timeouts in `BaseService` is idiomatic
- The `Debouncer` and `Cache` utils are reasonable
- `uuid()` using Web Crypto is correct for Deno
- The `EventCode` enum with 102 entries is a legitimate shared constant — that's the main value the portal and platform-monitor get from this library

---

## Bottom Line

The architecture is Python's "configure a global service object, then call methods on it" pattern wrapped in TypeScript classes. An idiomatic Deno rewrite would look more like: factory functions that take config and return a typed client, errors that propagate, no RxJS (or RxJS only in the IOT module with an adapter), and actual tests.

The biggest question is whether to refactor incrementally or rewrite — given that three downstream projects already depend on the current API surface, incremental is probably safer.
