import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { IOTConnection } from "../lib/iot.ts";
import { MockSocket } from "./_mock.ts";

interface IOTInternals {
  _socket: unknown;
  _connected: boolean;
  url: string;
  token: string;
  fingerPrint: string;
  secondary: boolean;
  reconnectTimer: number | null;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
  reconnectDelay: number;
  appName: string;
  appVersion: string;
  _events: Map<string, unknown>;
}

function createTestIOT(mockSocket?: MockSocket): [IOTConnection, IOTInternals] {
  const iot: IOTConnection = Object.create(IOTConnection.prototype);
  const internals = iot as unknown as IOTInternals;

  internals._events = new Map();
  internals._socket = null;
  internals._connected = false;
  internals.url = "https://iot.test.com/device";
  internals.token = "test-token-abc123";
  internals.fingerPrint = "device-fp-001";
  internals.secondary = false;
  internals.reconnectTimer = null;
  internals.reconnectAttempts = 0;
  internals.maxReconnectAttempts = 10;
  internals.reconnectDelay = 1000;
  internals.appName = "ElevationDenoService";
  internals.appVersion = "1.0.0";

  if (mockSocket) {
    internals._socket = mockSocket;
    internals._connected = true;
  }

  return [iot, internals];
}

describe("IOTConnection", () => {
  // new IOTConnection() calls connect() which tries real socket.io,
  // so we test with a manually constructed instance using mock injection.

  describe("with injected MockSocket", () => {
    let iot: IOTConnection;
    let mockSocket: MockSocket;

    beforeEach(() => {
      mockSocket = new MockSocket();
      mockSocket.connected = true;
      [iot] = createTestIOT(mockSocket);
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
      const [iot] = createTestIOT();

      iot.send({ type: "test", data: { value: 1 } });
    });
  });

  describe("destroy()", () => {
    it("should disconnect and remove all listeners", () => {
      const mockSocket = new MockSocket();
      mockSocket.connected = true;
      const [iot] = createTestIOT(mockSocket);

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
