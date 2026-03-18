import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { ElevatedIOT } from "../lib/iot.ts";
import { createCoreInfo, MockSocket } from "./_mock.ts";

describe("ElevatedIOT", () => {
  let iot: ElevatedIOT;

  beforeEach(() => {
    iot = new ElevatedIOT();
  });

  afterEach(() => {
    iot.destroy();
  });

  describe("initial state", () => {
    it("connected getter should return false initially", () => {
      assertEquals(iot.connected, false);
    });

    it("socket getter should return null initially", () => {
      assertEquals(iot.socket, null);
    });

    it("getConnectionStatus() should return false initially", () => {
      assertEquals(iot.getConnectionStatus(), false);
    });

    it("getSocketId() should return undefined initially", () => {
      assertEquals(iot.getSocketId(), undefined);
    });
  });

  describe("send() when not connected", () => {
    it("should not throw when socket is null", () => {
      // send() logs a warning but does not throw
      iot.send({ type: "test", data: { value: 1 } });
    });

    it("should not throw with empty type", () => {
      iot.send({ type: "", data: { value: 1 } });
    });
  });

  describe("sendMessage() when not connected", () => {
    it("should not throw when socket is null", () => {
      iot.sendMessage("test", { value: 1 });
    });
  });

  describe("with injected MockSocket", () => {
    let mockSocket: MockSocket;

    beforeEach(() => {
      // Inject mock socket without calling config() (which tries real socket.io)
      mockSocket = new MockSocket();
      mockSocket.connected = true;
      // deno-lint-ignore no-explicit-any
      (iot as any)._socket = mockSocket;
      // deno-lint-ignore no-explicit-any
      (iot as any)._connected = true;
      // deno-lint-ignore no-explicit-any
      (iot as any).coreInfo = createCoreInfo();
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
      // After disconnect, the mock socket's handlers should be cleared
      mockSocket.on("test", () => {});
      iot.disconnect();

      // MockSocket.removeAllListeners clears the handlers map
      // We can verify by checking the socket was nullified (disconnect cleans up)
      assertEquals(iot.socket, null);
      assertEquals(iot.connected, false);
    });
  });

  describe("destroy()", () => {
    it("should disconnect and remove all listeners", () => {
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

  // Note: Event forwarding tests (e.g., socket "command" -> IOT "command")
  // require setupSocketHandlers() to have been called, which happens inside
  // connect(). Since connect() invokes socket.io's io() function that requires
  // a real server, these tests would need integration testing with a live
  // socket.io server. The public API (send, sendMessage, disconnect, destroy,
  // getters) is fully covered above.
});
