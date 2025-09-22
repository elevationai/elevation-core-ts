import { BaseService } from '../shared/base.ts';
import { BehaviorSubject, Subject } from 'rxjs';
import { io, type Socket } from 'socket.io-client';
import type { Commands, CoreInfo, EventData, IOTInfo, OnlineKiosk } from '../../types/index.ts';

export class ElevatedIOT extends BaseService {
  private socket: Socket | null = null;
  public socket$: BehaviorSubject<Socket | null> = new BehaviorSubject<Socket | null>(null);
  public isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Event subjects for reactive programming with RxJS
  public onConnected: Subject<void> = new Subject<void>();
  public onDisconnect: Subject<void> = new Subject<void>();
  public onConfigurationRequired: Subject<void> = new Subject<void>();
  public onCommand: Subject<Commands> = new Subject<Commands>();
  public onFlightInfo: Subject<unknown> = new Subject<unknown>();
  public onRefresh: Subject<void> = new Subject<void>();
  public onPrint: Subject<unknown> = new Subject<unknown>();
  public onRestart: Subject<void> = new Subject<void>();
  public onEvent: Subject<EventData> = new Subject<EventData>();
  public onToast: Subject<unknown> = new Subject<unknown>();
  public onlineKiosks: Subject<OnlineKiosk[]> = new Subject<OnlineKiosk[]>();

  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private iotInfo: IOTInfo = { appName: 'ElevationDenoService' };

  public override config(coreInfo: CoreInfo, iotInfo?: IOTInfo): void {
    super.config(coreInfo);

    if (iotInfo) {
      this.iotInfo = iotInfo;
    }

    // Start connection
    this.connect();
  }

  public override refreshInfo(info: CoreInfo): void {
    this.config(info);
  }

  private connect(): void {
    if (!this.coreInfo || !this.coreInfo.iotEndpoint) {
      console.error('IOT endpoint not configured');
      return;
    }

    try {
      // Close existing connection if any
      this.disconnect(false);

      // Determine namespace based on iotEvents flag
      const namespace = this.coreInfo.iotEvents ? '/events' : '/device';

      // Parse the base URL
      const baseUrl = this.coreInfo.iotEndpoint.replace(/\/$/, ''); // Remove trailing slash
      const socketUrl = `${baseUrl}${namespace}`;

      console.log(`Connecting to Socket.io server at ${socketUrl}`);

      // Create Socket.io connection with authentication
      this.socket = io(socketUrl, {
        query: {
          token: this.coreInfo.token,
          key: this.coreInfo.fingerPrint,
          app: this.iotInfo.appName,
          version: this.iotInfo.appVersion || '1.0.0',
          secondary: this.coreInfo.secondary || false,
        },
      });

      this.socket$.next(this.socket);

      // Setup event handlers
      this.setupSocketHandlers();
    } catch (error) {
      console.error('Failed to create Socket.io connection:', error);
      this.scheduleReconnect();
    }
  }

  private setupSocketHandlers(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('IOT Socket.io connected:', this.socket?.id);
      this.isConnected.next(true);
      this.onConnected.next();
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('IOT Socket.io disconnected:', reason);
      this.isConnected.next(false);
      this.onDisconnect.next();

      // Socket.io handles reconnection automatically unless server-side disconnect
      if (reason === 'io server disconnect') {
        // The server forcefully disconnected, need manual reconnect
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('IOT Socket.io connection error:', error.message);

      // Check for configuration errors
      if (
        error.message?.includes('5000') || error.message?.includes('5001') ||
        error.message?.includes('Configuration') || error.message?.includes('Unauthorized')
      ) {
        console.error('Configuration error received');
        this.onConfigurationRequired.next();
        this.disconnect(true);
      }
    });

    // Custom events from server
    this.socket.on('command', (data: Commands) => {
      this.onCommand.next(data);
    });

    this.socket.on('flightinfo', (data: unknown) => {
      this.onFlightInfo.next(data);
    });

    this.socket.on('event', (data: EventData) => {
      this.onEvent.next(data);
    });

    this.socket.on('toast', (data: unknown) => {
      this.onToast.next(data);
    });

    this.socket.on('refresh', () => {
      this.onRefresh.next();
    });

    this.socket.on('onlineKiosks', (data: OnlineKiosk[]) => {
      this.onlineKiosks.next(data);
    });

    this.socket.on('print', (data: unknown) => {
      this.onPrint.next(data);
    });

    this.socket.on('restart', () => {
      this.onRestart.next();
    });

    // Handle disconnect reasons from server
    this.socket.on('error', (error: WebSocketError) => {
      console.error('IOT Socket.io error:', error);

      if (typeof error === 'object' && error !== null) {
        const errorMessage = error.message || error.reason || '';
        if (errorMessage.includes('Configuration') || errorMessage.includes('5000') || errorMessage.includes('5001')) {
          this.onConfigurationRequired.next();
          this.disconnect(true);
        }
      }
    });

    // Custom ping/pong if needed (Socket.io has built-in heartbeat)
    this.socket.on('ping', () => {
      this.socket?.emit('pong');
    });
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts),
      30000,
    );

    this.reconnectAttempts++;

    console.log(`Scheduling reconnection attempt ${this.reconnectAttempts} in ${delay}ms`);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  public send(data: { type: string; data: unknown }): void {
    if (this.socket && this.socket.connected) {
      // For Socket.io, we emit events rather than sending raw data
      if (data.type) {
        this.socket.emit(data.type, data.data || data);
      } else {
        this.socket.emit('message', data);
      }
    } else {
      console.warn('Cannot send data: Socket.io not connected');
    }
  }

  public sendMessage(type: string, data: unknown): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit(type, data);
    } else {
      console.warn(`Cannot send ${type}: Socket.io not connected`);
    }
  }

  public disconnect(_shouldReconnect = false): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.socket) {
      // Remove all listeners to prevent memory leaks
      this.socket.removeAllListeners();

      // Disconnect from Socket.io server
      this.socket.disconnect();
      this.socket = null;
    }

    this.isConnected.next(false);
  }

  public reconnect(): void {
    this.reconnectAttempts = 0;
    this.connect();
  }

  public getConnectionStatus(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  public getSocketId(): string | undefined {
    return this.socket?.id;
  }

  public destroy(): void {
    this.disconnect(false);
    this.onConnected.complete();
    this.onDisconnect.complete();
    this.onConfigurationRequired.complete();
    this.onCommand.complete();
    this.onFlightInfo.complete();
    this.onRefresh.complete();
    this.onPrint.complete();
    this.onRestart.complete();
    this.onEvent.complete();
    this.onToast.complete();
    this.onlineKiosks.complete();
  }
}

// Export singleton instance
export const iot: ElevatedIOT = new ElevatedIOT();
