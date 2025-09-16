import { BaseService } from '../shared/base.ts';
import { Subject } from 'rxjs';
import type { Commands, CoreInfo, IOTInfo } from '../../types/index.ts';

export class ElevatedIOT extends BaseService {
  // Event subjects for reactive programming with RxJS
  public onConnected: Subject<void> = new Subject<void>();
  public onDisconnect: Subject<void> = new Subject<void>();
  public onConfigRequired: Subject<void> = new Subject<void>();
  public onCommand: Subject<Commands> = new Subject<Commands>();
  public onFlightInfo: Subject<any> = new Subject<any>();
  public onRefresh: Subject<void> = new Subject<void>();
  public onPrint: Subject<any> = new Subject<any>();
  public onRestart: Subject<void> = new Subject<void>();
  public onNavigate: Subject<string> = new Subject<string>();

  private ws: WebSocket | null = null;
  private reconnectTimer: number | null = null;
  private pingTimer: number | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private iotInfo: IOTInfo = { appName: 'ElevationDenoService' };
  private isConnected = false;
  private shouldReconnect = true;

  public override config(coreInfo: CoreInfo, iotInfo?: IOTInfo): void {
    super.config(coreInfo);

    if (!coreInfo.iotEndpoint) {
      throw new Error('iotEndpoint is required in CoreInfo for IOT service');
    }

    if (!coreInfo.fingerPrint) {
      throw new Error('fingerPrint is required in CoreInfo for IOT service');
    }

    if (iotInfo) {
      this.iotInfo = iotInfo;
    }

    // Start connection
    this.connect();
  }

  private connect(): void {
    if (!this.coreInfo || !this.coreInfo.iotEndpoint) {
      return;
    }

    try {
      // Close existing connection if any
      this.disconnect(false);

      // Create WebSocket connection
      const wsUrl = new URL(this.coreInfo.iotEndpoint);
      wsUrl.searchParams.set('token', this.coreInfo.token);
      wsUrl.searchParams.set('fingerprint', this.coreInfo.fingerPrint!);
      wsUrl.searchParams.set('appName', this.iotInfo.appName);
      wsUrl.searchParams.set('appVersion', this.iotInfo.appVersion || '1.0.0');

      if (this.coreInfo.secondary) {
        wsUrl.searchParams.set('secondary', 'true');
      }

      this.ws = new WebSocket(wsUrl.toString());

      // Setup event handlers
      this.ws.onopen = () => this.handleOpen();
      this.ws.onmessage = (event) => this.handleMessage(event);
      this.ws.onclose = (event) => this.handleClose(event);
      this.ws.onerror = (error) => this.handleError(error);
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.scheduleReconnect();
    }
  }

  private handleOpen(): void {
    console.log('IOT WebSocket connected');
    this.isConnected = true;
    this.reconnectAttempts = 0;

    // Send initial handshake
    this.send({
      type: 'handshake',
      data: {
        fingerPrint: this.coreInfo!.fingerPrint,
        appName: this.iotInfo.appName,
        appVersion: this.iotInfo.appVersion,
        secondary: this.coreInfo!.secondary || false,
      },
    });

    // Start ping timer
    this.startPing();
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'connected':
          this.onConnected.next();
          break;

        case 'config_required':
          this.onConfigRequired.next();
          break;

        case 'command':
          this.onCommand.next(message.data);
          this.parseSpecialCommands(message.data);
          break;

        case 'flight_info':
          this.onFlightInfo.next(message.data);
          break;

        case 'refresh':
          this.onRefresh.next();
          break;

        case 'print':
          this.onPrint.next(message.data);
          break;

        case 'pong':
          // Pong received, connection is alive
          break;

        default:
          console.log('Unknown IOT message type:', message.type);
      }
    } catch (error) {
      console.error('Failed to parse IOT message:', error);
    }
  }

  private parseSpecialCommands(commands: Commands): void {
    if (commands.refresh) {
      this.onRefresh.next();
    }

    if (commands.restart) {
      this.onRestart.next();
    }

    if (commands.navigate) {
      this.onNavigate.next(commands.navigate);
    }

    if (commands.print) {
      this.onPrint.next(commands.print);
    }

    if (commands.flightInfo) {
      this.onFlightInfo.next(commands.flightInfo);
    }
  }

  private handleClose(event: CloseEvent): void {
    console.log('IOT WebSocket closed:', event.code, event.reason);
    this.isConnected = false;
    this.onDisconnect.next();

    this.stopPing();

    if (this.shouldReconnect && !event.wasClean) {
      this.scheduleReconnect();
    }
  }

  private handleError(error: Event): void {
    console.error('IOT WebSocket error:', error);
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
      30000, // Max 30 seconds
    );

    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  private startPing(): void {
    this.stopPing();

    this.pingTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping' });
      }
    }, 30000); // Ping every 30 seconds
  }

  private stopPing(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private send(data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  public sendCommand(command: Commands): void {
    this.send({
      type: 'command',
      data: command,
    });
  }

  public sendEvent(eventType: string, eventData: any): void {
    this.send({
      type: 'event',
      eventType,
      data: eventData,
    });
  }

  public disconnect(shouldReconnect = false): void {
    this.shouldReconnect = shouldReconnect;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.stopPing();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.isConnected = false;
  }

  public reconnect(): void {
    this.shouldReconnect = true;
    this.reconnectAttempts = 0;
    this.connect();
  }

  public getStatus(): {
    connected: boolean;
    reconnectAttempts: number;
    endpoint?: string;
  } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      endpoint: this.coreInfo?.iotEndpoint,
    };
  }

  // Clean up resources
  public destroy(): void {
    this.disconnect(false);
  }
}

// Export singleton instance
export const iot: ElevatedIOT = new ElevatedIOT();
