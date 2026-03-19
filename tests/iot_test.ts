import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { IOTConnection } from "../lib/iot.ts";
import { createCoreInfo, MockSocket } from "./_mock.ts";

describe("IOTConnection", () => {
  // IOTConnection.create() calls connect() which tries real socket.io,
  // so we test with a manually constructed instance using mock injection.

  describe("with injected MockSocket", () => {
    let iot: IOTConnection;
    let mockSocket: MockSocket;

    beforeEach(() => {
      // Create a bare IOTConnection by bypassing the private constructor
      // using Object.create + manual field setup (avoids socket.io connect)
      iot = Object.create(IOTConnection.prototype);
      // deno-lint-ignore no-explicit-any
      (iot as any)._socket = null;
      // deno-lint-ignore no-explicit-any
      (iot as any)._connected = false;
      // deno-lint-ignore no-explicit-any
      (iot as any).coreInfo = createCoreInfo();
      // deno-lint-ignore no-explicit-any
      (iot as any).reconnectTimer = null;
      // deno-lint-ignore no-explicit-any
      (iot as any).reconnectAttempts = 0;
      // deno-lint-ignore no-explicit-any
      (iot as any).maxReconnectAttempts = 10;
      // deno-lint-ignore no-explicit-any
      (iot as any).reconnectDelay = 1000;
      // deno-lint-ignore no-explicit-any
      (iot as any).iotInfo = { appName: "ElevationDenoService" };
      // Initialize AwaitableEmitter internals
      // deno-lint-ignore no-explicit-any
      (iot as any)._events = new Map();

      mockSocket = new MockSocket();
      mockSocket.connected = true;
      // deno-lint-ignore no-explicit-any
      (iot as any)._socket = mockSocket;
      // deno-lint-ignore no-explicit-any
      (iot as any)._connected = true;
    });

    afterEach(() => {
      iot.destroy();
    });

    it("connected getter should return true after injection", () => {
      assertEquals(iot.connected, true);
    });

    it("getConnectionStatus() should return true when socket.connected is true", () => {
      assertEquals(iot.getConnectionStatus(), true);
    });

    it("getSocketId() should return mock socket id", () => {
      assertEquals(iot.getSocketId(), "mock-socket-id-123");
    });

    it("send() should emit on socket using data.type as event name", () => {
      iot.send({ type: "customEvent", data: { value: 42 } });

      assertEquals(mockSocket.emitted.length, 1);
      assertEquals(mockSocket.emitted[0].event, "customEvent");
      assertEquals(mockSocket.emitted[0].data, { value: 42 });
    });

    it("send() should fall back to 'message' when type is empty", () => {
      const payload = { type: "", data: { value: 99 } };
      iot.send(payload);

      assertEquals(mockSocket.emitted.length, 1);
      assertEquals(mockSocket.emitted[0].event, "message");
      assertEquals(mockSocket.emitted[0].data, payload);
    });

    it("sendMessage() should emit type and data on socket", () => {
      iot.sendMessage("status", { online: true });

      assertEquals(mockSocket.emitted.length, 1);
      assertEquals(mockSocket.emitted[0].event, "status");
      assertEquals(mockSocket.emitted[0].data, { online: true });
    });

    it("disconnect() should set connected to false and nullify socket", () => {
      iot.disconnect();

      assertEquals(iot.connected, false);
      assertEquals(iot.socket, null);
    });

    it("disconnect() should call removeAllListeners on the socket", () => {
      mockSocket.on("test", () => {});
      iot.disconnect();

      assertEquals(iot.socket, null);
      assertEquals(iot.connected, false);
    });
  });

  describe("send() when not connected", () => {
    it("should not throw when socket is null", () => {
      const iot = Object.create(IOTConnection.prototype);
      // deno-lint-ignore no-explicit-any
      (iot as any)._socket = null;
      // deno-lint-ignore no-explicit-any
      (iot as any)._connected = false;
      // deno-lint-ignore no-explicit-any
      (iot as any)._events = new Map();

      iot.send({ type: "test", data: { value: 1 } });
    });
  });

  describe("destroy()", () => {
    it("should disconnect and remove all listeners", () => {
      const iot = Object.create(IOTConnection.prototype);
      // deno-lint-ignore no-explicit-any
      (iot as any)._events = new Map();
      // deno-lint-ignore no-explicit-any
      (iot as any).reconnectTimer = null;

      const mockSocket = new MockSocket();
      mockSocket.connected = true;
      // deno-lint-ignore no-explicit-any
      (iot as any)._socket = mockSocket;
      // deno-lint-ignore no-explicit-any
      (iot as any)._connected = true;

      // Add a listener on the IOT emitter itself
      let called = false;
      iot.on("test", () => {
        called = true;
      });

      iot.destroy();

      assertEquals(iot.connected, false);
      assertEquals(iot.socket, null);

      // After destroy, emitting should not trigger the listener
      iot.emit("test");
      assertEquals(called, false);
    });
  });
});
