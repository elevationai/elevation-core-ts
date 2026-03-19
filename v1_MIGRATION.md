# Migration Guide: v0.x → v1.1.0

## Breaking Changes

### Singletons removed — direct instantiation

All services now use `new` with simple positional arguments instead of singletons with `.config()`.

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
const events = new EventsClient(url, token);
const logs = new LogsClient(url, token);
const iot = new IOTConnection(iotUrl, token, fingerPrint);
const enrollment = new EnrollmentClient(url, token, fingerPrint);
const config = new ConfigClient(url, token, deviceId, locationId);
const cms = new CMSClient(url, token);
```

### CoreInfo removed

The `CoreInfo` interface has been removed. Each class now accepts only the arguments it needs as simple positional parameters.

| Class              | Constructor                                                    |
| ------------------ | -------------------------------------------------------------- |
| `LogsClient`       | `new LogsClient(url, token, timeout?)`                         |
| `EventsClient`     | `new EventsClient(url, token, timeout?)`                       |
| `CMSClient`        | `new CMSClient(url, token, timeout?)`                          |
| `ConfigClient`     | `new ConfigClient(url, token, deviceId, locationId, timeout?)` |
| `EnrollmentClient` | `new EnrollmentClient(url, token, fingerPrint, timeout?)`      |
| `TouchPointClient` | `new TouchPointClient(url, token, fingerPrint, timeout?)`      |
| `IOTConnection`    | `new IOTConnection(url, token, fingerPrint, secondary?)`       |

### ElevatedConfigurationsInfo removed

The `ElevatedConfigurationsInfo` interface has been removed. `ConfigClient` now takes `deviceId` and `locationId` as direct constructor arguments. The optional `version` is a settable property.

```ts
// Before
const configInfo: ElevatedConfigurationsInfo = { deviceId: "dev-1", locationId: "loc-1", version: "2.0" };
const config = ConfigClient.create(coreInfo, configInfo);

// After
const config = new ConfigClient(url, token, "dev-1", "loc-1");
config.version = "2.0";
```

### IOTInfo removed

The `IOTInfo` interface has been removed. `IOTConnection` exposes `appName` and `appVersion` as settable properties.

```ts
// Before
const iotInfo: IOTInfo = { appName: "myApp", appVersion: "1.0.0" };
const iot = IOTConnection.create(coreInfo, iotInfo);

// After
const iot = new IOTConnection(iotUrl, token, fingerPrint);
iot.appName = "myApp";
iot.appVersion = "1.0.0";
```

### CMS optional properties

`version`, `pageName`, `textReplaces`, and `isDraft` are now settable properties on `CMSClient`.

```ts
// Before
const coreInfo: CoreInfo = { token, serviceEndpoint, version: "v2", isDraft: true };
const cms = CMSClient.create(coreInfo);

// After
const cms = new CMSClient(url, token);
cms.version = "v2";
cms.isDraft = true;
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

| Old singleton | New instantiation                                    |
| ------------- | ---------------------------------------------------- |
| `elogs`       | `new LogsClient(url, token)`                         |
| `events`      | `new EventsClient(url, token)`                       |
| `iot`         | `new IOTConnection(iotUrl, token, fingerPrint)`      |
| `enrollment`  | `new EnrollmentClient(url, token, fingerPrint)`      |
| `configMgmt`  | `new ConfigClient(url, token, deviceId, locationId)` |
| `cms`         | `new CMSClient(url, token)`                          |
| `touchPoint`  | `new TouchPointClient(url, token, fingerPrint)`      |

### Type renames

| Old name         | New name |
| ---------------- | -------- |
| `ConfigMgmtInfo` | Removed  |
| `DeviceUpdate`   | `Device` |

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
const iot = new IOTConnection(iotUrl, token, fingerPrint);
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
const cms = new CMSClient(url, token);
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

const iot = new IOTConnection(iotUrl, token, fingerPrint);

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
const iot = new IOTConnection(iotUrl, token, fingerPrint);
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
const touchPoint = new TouchPointClient(url, token, fingerPrint);
```

### Checkin-connect (React)

Apply the same IOT and singleton → direct instantiation patterns as portal. For CMS usage:

```ts
// Before
import { cms } from "@eai/elevation-core-ts";
cms.config(coreInfo);

// After
import { CMSClient } from "@eai/elevation-core-ts";
const cms = new CMSClient(url, token);
```

`getKey()`, `getString()`, `getConfig()` method signatures are unchanged.
