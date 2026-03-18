# Migration Guide: v0.x → v1.0.0

## Breaking Changes

### RxJS removed

The `rxjs` dependency has been completely removed. The IOT and CMS modules have new APIs.

### IOT: Subjects → AwaitableEmitter

`ElevatedIOT` now extends `AwaitableEmitter` from `@eai/models`. All event subscriptions use `.on()` / `.off()` instead of RxJS Subjects.

#### Event subscriptions

```ts
// Before
iot.onConnected.subscribe(() => { ... });
iot.onConnected.asObservable().subscribe(() => { ... });
iot.onCommand.subscribe((data) => { ... });
const sub = iot.onEvent.subscribe((data) => { ... });
sub.unsubscribe();

// After
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

`loadAllStrings()` now returns `Promise<ICMS[]>` instead of `Observable<ICMS[]>`. Request deduplication still works — concurrent calls share the same in-flight Promise.

```ts
// Before
import { firstValueFrom } from "rxjs";
const strings = await firstValueFrom(cms.loadAllStrings());

// After
const strings = await cms.loadAllStrings();
```

The `stringsObservable` public property has been removed. All other CMS methods (`getKey`, `getKeys`, `getString`, `getConfig`, `getLangs`) are unchanged — they were already Promise-based.

## New Features

### Subpath exports

You can now import individual modules without pulling in the entire library:

```ts
// Types only (no socket.io, no fetch overhead)
import { EventCode, StatusCode } from "@eai/elevation-core-ts/types";

// Individual modules
import { iot } from "@eai/elevation-core-ts/iot";
import { cms } from "@eai/elevation-core-ts/cms";
import { events } from "@eai/elevation-core-ts/events";
import { touchPoint } from "@eai/elevation-core-ts/touchpoint";
import { elevatedConfigurations } from "@eai/elevation-core-ts/config";
import { enrollment } from "@eai/elevation-core-ts/enrollment";

// Full library (still works, backward compatible)
import { cms, EventCode, iot } from "@eai/elevation-core-ts";
```

## Per-project migration

### Portal (Angular)

**`socket.service.ts`** — largest change:

```ts
// Before
import { iot } from '@jsr/eai__elevation-core-ts';

iot.socket$.asObservable().subscribe(socket => {
  this.socket = socket || undefined;
});
iot.onConnected.asObservable().subscribe(() => { ... });
iot.onEvent.asObservable().subscribe(data => { ... });
iot.onDisconnect.asObservable().subscribe(() => { ... });
onToast = iot.onToast;

// After
import { iot } from '@jsr/eai__elevation-core-ts';

iot.on("socket", socket => {
  this.socket = socket || undefined;
});
iot.on("connected", () => { ... });
iot.on("event", data => { ... });
iot.on("disconnected", () => { ... });

// For onToast, bridge to a local Subject if needed downstream:
private _onToast = new Subject<unknown>();
onToast = this._onToast.asObservable();
// in constructor:
iot.on("toast", data => this._onToast.next(data));
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

**`app.component.ts`**, **device-hardwares**, **device-applications**, **reports-wizard** — these only use `EventCode`, no changes needed.

### Platform-monitor (Deno)

**`iot_socket.ts`**:

```ts
// Before
iot.isConnected.getValue();
iot.onConnected.subscribe(() => { ... });
iot.onCommand.subscribe((data) => { ... });
const sub = iot.onEvent.subscribe((data) => { ... });
sub.unsubscribe();

// After
iot.connected;
iot.on("connected", () => { ... });
iot.on("command", (data) => { ... });
const handler = (data) => { ... };
iot.on("event", handler);
iot.off("event", handler);  // cleanup
```

Platform-monitor can also switch to subpath imports:

```ts
// Before
import { EventCode, StatusCode, touchPoint } from "@eai/elevation-core-ts";

// After (optional, reduces resolved dependencies)
import { EventCode, StatusCode } from "@eai/elevation-core-ts/types";
import { touchPoint } from "@eai/elevation-core-ts/touchpoint";
```

### Checkin-connect (React)

Apply the same IOT patterns as portal. For CMS usage, no changes — `getKey()`, `getString()`, `getConfig()` are unchanged.
