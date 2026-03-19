# Migration Guide: v0.x → v1.0.0

## Breaking Changes

### Singletons removed — factory pattern

All services now use a static `create()` factory method instead of singletons with `.config()`. You instantiate each
service by passing `CoreInfo` directly to `create()`.

```ts
// Before
import { cms, configMgmt, elogs, enrollment, events, iot } from "@eai/elevation-core-ts";
events.config(coreInfo);
elogs.config(coreInfo);
iot.config(coreInfo, iotInfo);
enrollment.config(coreInfo);
configMgmt.config(coreInfo, configMgmtInfo);
cms.config(coreInfo);

// After
import { CMSClient, ConfigClient, EnrollmentClient, EventsClient, IOTConnection, LogsClient } from "@eai/elevation-core-ts";
const events = EventsClient.create(coreInfo);
const logs = LogsClient.create(coreInfo);
const iot = IOTConnection.create(coreInfo, iotInfo);
const enrollment = EnrollmentClient.create(coreInfo);
const config = ConfigClient.create(coreInfo, configInfo);
const cms = CMSClient.create(coreInfo);
```

### Class renames

| Old name                                | New name           |
| --------------------------------------- | ------------------ |
| `ElevatedEvents`                        | `EventsClient`     |
| `ElevatedLogs`                          | `LogsClient`       |
| `ElevatedIOT`                           | `IOTConnection`    |
| `ElevatedEnrollment`                    | `EnrollmentClient` |
| `ElevatedConfigurations` / `ConfigMgmt` | `ConfigClient`     |
| `CMS`                                   | `CMSClient`        |
| `TouchPoint`                            | `TouchPointClient` |

### Singleton export renames

| Old singleton            | New factory call                          |
| ------------------------ | ----------------------------------------- |
| `elogs`                  | `LogsClient.create(coreInfo)`             |
| `events`                 | `EventsClient.create(coreInfo)`           |
| `iot`                    | `IOTConnection.create(coreInfo, iotInfo)` |
| `enrollment`             | `EnrollmentClient.create(coreInfo)`       |
| `configMgmt`             | `ConfigClient.create(coreInfo, info)`     |
| `cms`                    | `CMSClient.create(coreInfo)`              |
| `touchPoint`             | `TouchPointClient.create(coreInfo)`       |
| `elevatedConfigurations` | `ConfigClient.create(coreInfo, info)`     |

### Type renames

| Old name         | New name                     |
| ---------------- | ---------------------------- |
| `ConfigMgmtInfo` | `ElevatedConfigurationsInfo` |
| `DeviceUpdate`   | `Device`                     |

### RxJS removed

The `rxjs` dependency has been completely removed. The IOT and CMS modules have new APIs.

### IOT: Subjects → AwaitableEmitter

`IOTConnection` (formerly `ElevatedIOT`) extends `AwaitableEmitter` from `@eai/models`. All event subscriptions use
`.on()` / `.off()` instead of RxJS Subjects.

#### Event subscriptions

```ts
// Before
iot.onConnected.subscribe(() => { ... });
iot.onConnected.asObservable().subscribe(() => { ... });
iot.onCommand.subscribe((data) => { ... });
const sub = iot.onEvent.subscribe((data) => { ... });
sub.unsubscribe();

// After
const iot = IOTConnection.create(coreInfo, iotInfo);
iot.on("connected", () => { ... });
iot.on("command", (data) => { ... });
const handler = (data) => { ... };
iot.on("event", handler);
iot.off("event", handler);
```

#### State access

```ts
// Before
iot.socket$.getValue();
iot.isConnected.getValue();

// After
iot.socket;
iot.connected;
```

#### Socket change notifications

```ts
// Before
iot.socket$.asObservable().subscribe((socket) => { ... });

// After
iot.on("socket", (socket) => { ... });
```

#### Toast (was exposed as raw Subject)

```ts
// Before
const toastSubject = iot.onToast; // Direct Subject reference
toastSubject.subscribe((data) => { ... });

// After
iot.on("toast", (data) => { ... });
```

#### Full event name mapping

| Old property              | New event name            |
| ------------------------- | ------------------------- |
| `onConnected`             | `"connected"`             |
| `onDisconnect`            | `"disconnected"`          |
| `onConfigurationRequired` | `"configurationRequired"` |
| `onCommand`               | `"command"`               |
| `onFlightInfo`            | `"flightInfo"`            |
| `onRefresh`               | `"refresh"`               |
| `onPrint`                 | `"print"`                 |
| `onRestart`               | `"restart"`               |
| `onEvent`                 | `"event"`                 |
| `onToast`                 | `"toast"`                 |
| `onlineKiosks`            | `"onlineKiosks"`          |
| `socket$` (change)        | `"socket"`                |

### CMS: Observable → Promise

`loadAllStrings()` now returns `Promise<ICMS[]>` instead of `Observable<ICMS[]>`. Request deduplication still works —
concurrent calls share the same in-flight Promise.

```ts
// Before
import { firstValueFrom } from "rxjs";
const strings = await firstValueFrom(cms.loadAllStrings());

// After
const cms = CMSClient.create(coreInfo);
const strings = await cms.loadAllStrings();
```

The `stringsObservable` public property has been removed. All other CMS methods (`getKey`, `getKeys`, `getString`,
`getConfig`, `getLangs`) are unchanged — they were already Promise-based.

## New Features

### Subpath exports

You can now import individual modules without pulling in the entire library:

```ts
// Types only (no socket.io, no fetch overhead)
import { EventCode, StatusCode } from "@eai/elevation-core-ts/types";

// Individual modules
import { IOTConnection } from "@eai/elevation-core-ts/iot";
import { CMSClient } from "@eai/elevation-core-ts/cms";
import { EventsClient } from "@eai/elevation-core-ts/events";
import { LogsClient } from "@eai/elevation-core-ts/logs";
import { TouchPointClient } from "@eai/elevation-core-ts/touchpoint";
import { ConfigClient } from "@eai/elevation-core-ts/config";
import { EnrollmentClient } from "@eai/elevation-core-ts/enrollment";
import { Cache, Debouncer, uuid } from "@eai/elevation-core-ts/utils";

// Full library (still works)
import { CMSClient, EventCode, IOTConnection } from "@eai/elevation-core-ts";
```

### fetchAndCacheConfig

`ConfigClient` has a new `fetchAndCacheConfig()` method that fetches a configuration from the server, compares it
against a local `.jsonc` file, and writes to disk if changed. Supports backup rotation.

```ts
const config = ConfigClient.create(coreInfo, configInfo);
const result = await config.fetchAndCacheConfig({
  label: "app-settings",
  filePath: "./config/app-settings.jsonc",
  maxBackups: 3,
});
// result.updated — true if file was written
// result.firstFetch — true if no prior local file existed
// result.data — the configuration data
```

## Per-project migration

### Portal (Angular)

**`socket.service.ts`** — largest change:

```ts
// Before
import { iot } from "@jsr/eai__elevation-core-ts";

iot.socket$.asObservable().subscribe((socket) => {
  this.socket = socket || undefined;
});
iot.onConnected.asObservable().subscribe(() => { ... });
iot.onEvent.asObservable().subscribe((data) => { ... });
iot.onDisconnect.asObservable().subscribe(() => { ... });
onToast = iot.onToast;

// After
import { IOTConnection } from "@jsr/eai__elevation-core-ts";

const iot = IOTConnection.create(coreInfo, iotInfo);

iot.on("socket", (socket) => {
  this.socket = socket || undefined;
});
iot.on("connected", () => { ... });
iot.on("event", (data) => { ... });
iot.on("disconnected", () => { ... });

// For onToast, bridge to a local Subject if needed downstream:
private _onToast = new Subject<unknown>();
onToast = this._onToast.asObservable();
// in constructor:
iot.on("toast", (data) => this._onToast.next(data));
```

**`kiosk-preview.service.ts`**:

```ts
// Before
const socket = iot.socket$.getValue();
iot.onEvent.asObservable().subscribe((data) => { ... });

// After
const socket = iot.socket;
iot.on("event", (data) => { ... });
```

**`app.component.ts`**, **device-hardwares**, **device-applications**, **reports-wizard** — these only use `EventCode`,
no changes needed.

### Platform-monitor (Deno)

**`iot_socket.ts`**:

```ts
// Before
import { iot } from "@eai/elevation-core-ts";
iot.isConnected.getValue();
iot.onConnected.subscribe(() => { ... });
iot.onCommand.subscribe((data) => { ... });
const sub = iot.onEvent.subscribe((data) => { ... });
sub.unsubscribe();

// After
import { IOTConnection } from "@eai/elevation-core-ts";
const iot = IOTConnection.create(coreInfo, iotInfo);
iot.connected;
iot.on("connected", () => { ... });
iot.on("command", (data) => { ... });
const handler = (data) => { ... };
iot.on("event", handler);
iot.off("event", handler); // cleanup
```

Platform-monitor can also switch to subpath imports:

```ts
// Before
import { EventCode, StatusCode, touchPoint } from "@eai/elevation-core-ts";

// After (optional, reduces resolved dependencies)
import { EventCode, StatusCode } from "@eai/elevation-core-ts/types";
import { TouchPointClient } from "@eai/elevation-core-ts/touchpoint";
const touchPoint = TouchPointClient.create(coreInfo);
```

### Checkin-connect (React)

Apply the same IOT and singleton → factory patterns as portal. For CMS usage, update to the factory pattern:

```ts
// Before
import { cms } from "@eai/elevation-core-ts";
cms.config(coreInfo);

// After
import { CMSClient } from "@eai/elevation-core-ts";
const cms = CMSClient.create(coreInfo);
```

`getKey()`, `getString()`, `getConfig()` method signatures are unchanged.
