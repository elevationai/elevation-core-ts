import type { CoreInfo, Device, DeviceInfo, DeviceLocation, Specification, Terminal } from "../types/index.ts";

// --- MockFetch ---

interface QueuedResponse {
  status: number;
  body: unknown;
  headers?: Record<string, string>;
}

interface RecordedRequest {
  url: string;
  init: RequestInit;
}

export class MockFetch {
  public requests: RecordedRequest[] = [];
  private responses: QueuedResponse[] = [];
  private originalFetch: typeof globalThis.fetch;

  constructor() {
    this.originalFetch = globalThis.fetch;
  }

  queueResponse(body: unknown, status = 200): void {
    this.responses.push({ status, body });
  }

  install(): void {
    // deno-lint-ignore no-explicit-any
    (globalThis as any).fetch = (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      this.requests.push({ url, init: init || {} });
      const queued = this.responses.shift();
      if (!queued) {
        return Promise.reject(new Error("MockFetch: No response queued"));
      }
      return Promise.resolve(
        new Response(JSON.stringify(queued.body), {
          status: queued.status,
          headers: { "Content-Type": "application/json", ...queued.headers },
        }),
      );
    };
  }

  restore(): void {
    globalThis.fetch = this.originalFetch;
  }

  reset(): void {
    this.requests = [];
    this.responses = [];
  }

  get lastRequest(): RecordedRequest | undefined {
    return this.requests[this.requests.length - 1];
  }

  get lastUrl(): string | undefined {
    return this.lastRequest?.url;
  }

  get lastBody(): unknown {
    const body = this.lastRequest?.init?.body;
    return body ? JSON.parse(body as string) : undefined;
  }

  get lastMethod(): string | undefined {
    return this.lastRequest?.init?.method;
  }

  get lastHeaders(): Record<string, string> | undefined {
    const h = this.lastRequest?.init?.headers;
    if (!h) return undefined;
    if (h instanceof Headers) {
      const obj: Record<string, string> = {};
      h.forEach((v, k) => obj[k] = v);
      return obj;
    }
    return h as Record<string, string>;
  }
}

// --- Factory helpers ---

export function createCoreInfo(overrides?: Partial<CoreInfo>): CoreInfo {
  return {
    token: "test-token-abc123",
    serviceEndpoint: "https://api.test.com",
    fingerPrint: "device-fp-001",
    iotEndpoint: "https://iot.test.com",
    ...overrides,
  };
}

export function createDevice(overrides?: Partial<Device>): Device {
  return {
    _id: "device-001",
    elevatedKey: "key-001",
    label: "Test Device",
    organization: "org-001",
    tags: ["test"],
    location: "loc-001",
    metadata: { configured: false },
    ...overrides,
  };
}

export function createDeviceLocation(overrides?: Partial<DeviceLocation>): DeviceLocation {
  return {
    _id: "loc-001",
    name: "Test Location",
    terminals: [{ _id: "term-001", name: "Terminal 1" }],
    organization: "org-001",
    ...overrides,
  };
}

export function createTerminal(overrides?: Partial<Terminal>): Terminal {
  return {
    _id: "term-001",
    name: "Terminal 1",
    ...overrides,
  };
}

export function createSpecification(overrides?: Partial<Specification>): Specification {
  return {
    id: "spec-001",
    name: "Kiosk v2",
    model: "K2000",
    ...overrides,
  };
}

export function createDeviceInfo(overrides?: Partial<DeviceInfo>): DeviceInfo {
  return {
    label: "NEW-DEVICE-01",
    device: createDevice(),
    location: createDeviceLocation(),
    terminal: createTerminal(),
    specification: createSpecification(),
    ...overrides,
  };
}

// --- MockSocket ---

// deno-lint-ignore no-explicit-any
type HandlerFn = (...args: any[]) => void;

export class MockSocket {
  private handlers = new Map<string, HandlerFn[]>();
  public emitted: { event: string; data: unknown }[] = [];
  public id = "mock-socket-id-123";
  public connected = false;

  on(event: string, handler: HandlerFn): this {
    if (!this.handlers.has(event)) this.handlers.set(event, []);
    this.handlers.get(event)!.push(handler);
    return this;
  }

  emit(event: string, ...args: unknown[]): this {
    this.emitted.push({ event, data: args.length === 1 ? args[0] : args });
    return this;
  }

  simulateEvent(event: string, ...args: unknown[]): void {
    for (const handler of this.handlers.get(event) || []) {
      handler(...args);
    }
  }

  connect(): void {
    this.connected = true;
  }

  disconnect(): void {
    this.connected = false;
  }

  removeAllListeners(): void {
    this.handlers.clear();
  }
}

// --- DenoFsStub ---

export class DenoFsStub {
  public files = new Map<string, string>();
  public writtenFiles: { path: string; content: string }[] = [];
  public renames: { from: string; to: string }[] = [];
  public removedPaths: string[] = [];

  private origReadTextFile!: typeof Deno.readTextFile;
  private origWriteTextFile!: typeof Deno.writeTextFile;
  private origRename!: typeof Deno.rename;
  private origRemove!: typeof Deno.remove;

  install(): void {
    this.origReadTextFile = Deno.readTextFile;
    this.origWriteTextFile = Deno.writeTextFile;
    this.origRename = Deno.rename;
    this.origRemove = Deno.remove;

    // deno-lint-ignore no-explicit-any
    (Deno as any).readTextFile = (path: string | URL): Promise<string> => {
      const p = path.toString();
      if (this.files.has(p)) {
        return Promise.resolve(this.files.get(p)!);
      }
      return Promise.reject(new Deno.errors.NotFound(`File not found: ${p}`));
    };

    // deno-lint-ignore no-explicit-any
    (Deno as any).writeTextFile = (path: string | URL, content: string): Promise<void> => {
      const p = path.toString();
      this.files.set(p, content);
      this.writtenFiles.push({ path: p, content });
      return Promise.resolve();
    };

    // deno-lint-ignore no-explicit-any
    (Deno as any).rename = (from: string | URL, to: string | URL): Promise<void> => {
      const f = from.toString();
      const t = to.toString();
      if (!this.files.has(f)) {
        return Promise.reject(new Deno.errors.NotFound(`File not found: ${f}`));
      }
      this.files.set(t, this.files.get(f)!);
      this.files.delete(f);
      this.renames.push({ from: f, to: t });
      return Promise.resolve();
    };

    // deno-lint-ignore no-explicit-any
    (Deno as any).remove = (path: string | URL): Promise<void> => {
      const p = path.toString();
      if (!this.files.has(p)) {
        return Promise.reject(new Deno.errors.NotFound(`File not found: ${p}`));
      }
      this.files.delete(p);
      this.removedPaths.push(p);
      return Promise.resolve();
    };
  }

  restore(): void {
    // deno-lint-ignore no-explicit-any
    (Deno as any).readTextFile = this.origReadTextFile;
    // deno-lint-ignore no-explicit-any
    (Deno as any).writeTextFile = this.origWriteTextFile;
    // deno-lint-ignore no-explicit-any
    (Deno as any).rename = this.origRename;
    // deno-lint-ignore no-explicit-any
    (Deno as any).remove = this.origRemove;
  }

  setFile(path: string, content: string): void {
    this.files.set(path, content);
  }

  reset(): void {
    this.files.clear();
    this.writtenFiles = [];
    this.renames = [];
    this.removedPaths = [];
  }
}
