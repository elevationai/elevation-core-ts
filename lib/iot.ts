import { AwaitableEmitter } from "@eai/models/AwaitableEmitter";
import { io, type Socket } from "socket.io-client";
import type { Commands, EventData, OnlineKiosk } from "../types/mod.ts";

interface WebSocketError {
  message?: string;
  reason?: string;
}

export class IOTConnection extends AwaitableEmitter {
  private _socket: Socket | null = null;
  private _connected = false;
  private readonly url: string;
  private token: string;
  private readonly fingerPrint: string;
  private readonly secondary: boolean;

  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private readonly reconnectDelay = 1000;
  public appName = "ElevationDenoService";
  public appVersion = "1.0.0";

  get socket(): Socket | null {
    return this._socket;
  }

  get connected(): boolean {
    return this._connected;
  }

  constructor(url: string, token: string, fingerPrint: string, appName?: string, appVersion?: string, secondary?: boolean) {
    super();
    this.url = url;
    this.token = token;
    this.fingerPrint = fingerPrint;
    this.appName = appName || this.appName;
    this.appVersion = appVersion || this.appVersion;
    this.secondary = secondary || false;

    this.connect();
  }

  refreshToken(token: string): void {
    console.log('Refresh Token');
    this.token = token;
    this.connect();
  }

  private connect(): void {
    try {
      this.disconnect(false);

      console.log(`Connecting to Socket.io server at ${this.url}`);

      this._socket = io(this.url, {
        transports: ['websocket'],
        query: {
          token: this.token,
          key: this.fingerPrint,
          app: this.appName,
          version: this.appVersion,
          secondary: this.secondary,
        },
      });

      this.emit("socket", this._socket);
      this.setupSocketHandlers();
    }
    catch (error) {
      console.error("Failed to create Socket.io connection:", error);
      this.scheduleReconnect();
    }
  }

  private setupSocketHandlers(): void {
    if (!this._socket) return;

    this._socket.on("connect", () => {
      console.log("IOT Socket.io connected:", this._socket?.id);
      this._connected = true;
      this.emit("connected");
      this.reconnectAttempts = 0;
    });

    this._socket.on("disconnect", (reason: string) => {
      console.log("IOT Socket.io disconnected:", reason);
      this._connected = false;
      this.emit("disconnected", reason);

      if (reason === "io server disconnect") {
        this._socket?.connect();
      }
    });

    this._socket.on("connect_error", (error: Error) => {
      console.error("IOT Socket.io connection error:", error.message);

      if (
        error.message?.includes("5000") || error.message?.includes("5001") ||
        error.message?.includes("Configuration") || error.message?.includes("Unauthorized")
      ) {
        console.error("Configuration error received");
        this.emit("configurationRequired");
        this.disconnect(true);
      }
    });

    this._socket.on("command", (data: Commands) => {
      this.emit("command", data);
    });

    this._socket.on("flightinfo", (data: unknown) => {
      this.emit("flightInfo", data);
    });

    this._socket.on("event", (data: EventData) => {
      this.emit("event", data);
    });

    this._socket.on("toast", (data: unknown) => {
      this.emit("toast", data);
    });

    this._socket.on("refresh", () => {
      this.emit("refresh");
    });

    this._socket.on("onlineDevices", (data: OnlineKiosk[]) => {
      this.emit("onlineDevices", data);
    });

    this._socket.on("print", (data: unknown) => {
      this.emit("print", data);
    });

    this._socket.on("restart", () => {
      this.emit("restart");
    });

    this._socket.on("error", (error: WebSocketError) => {
      console.error("IOT Socket.io error:", error);

      if (typeof error === "object" && error !== null) {
        const errorMessage = error.message || error.reason || "";
        if (errorMessage.includes("Configuration") || errorMessage.includes("5000") || errorMessage.includes("5001")) {
          this.emit("configurationRequired");
          this.disconnect(true);
        }
      }
    });

    this._socket.on("ping", () => {
      this._socket?.emit("pong");
    });
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), 30000);

    this.reconnectAttempts++;

    console.log(`Scheduling reconnection attempt ${this.reconnectAttempts} in ${delay}ms`);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  public send(data: { type: string; data: unknown }): void {
    if (this._socket && this._socket.connected) {
      if (data.type) {
        this._socket.emit(data.type, data.data || data);
      }
      else {
        this._socket.emit("message", data);
      }
    }
    else {
      console.warn("Cannot send data: Socket.io not connected");
    }
  }

  public sendMessage(type: string, data: unknown): void {
    if (this._socket && this._socket.connected) {
      this._socket.emit(type, data);
    }
    else {
      console.warn(`Cannot send ${type}: Socket.io not connected`);
    }
  }

  public disconnect(_shouldReconnect = false): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this._socket) {
      this._socket.removeAllListeners();
      this._socket.disconnect();
      this._socket = null;
    }

    this._connected = false;
  }

  public reconnect(): void {
    this.reconnectAttempts = 0;
    this.connect();
  }

  public getConnectionStatus(): boolean {
    return this._connected && this._socket?.connected === true;
  }

  public getSocketId(): string | undefined {
    return this._socket?.id;
  }

  public destroy(): void {
    this.disconnect(false);
    this.removeAllListeners();
  }
}
