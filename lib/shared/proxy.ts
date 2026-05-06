import { Agent as HttpsAgent } from "node:https";
import { Buffer } from "node:buffer";
import * as net from "node:net";
import * as tls from "node:tls";
import type { Duplex } from "node:stream";

export function resolveProxy(targetUrl: string): URL | null {
  let target: URL;
  try {
    target = new URL(targetUrl);
  }
  catch {
    return null;
  }

  const isSecure = target.protocol === "https:" || target.protocol === "wss:";

  let proxyVar: string | undefined;
  let noProxyVar: string | undefined;
  try {
    proxyVar = isSecure
      ? Deno.env.get("HTTPS_PROXY") ?? Deno.env.get("https_proxy")
      : Deno.env.get("HTTP_PROXY") ?? Deno.env.get("http_proxy");
    noProxyVar = Deno.env.get("NO_PROXY") ?? Deno.env.get("no_proxy");
  }
  catch {
    return null;
  }

  if (!proxyVar) return null;
  if (noProxyVar && matchesNoProxy(target.hostname, noProxyVar)) return null;

  try {
    return new URL(proxyVar);
  }
  catch {
    return null;
  }
}

export function envProxyAgent(url: string): HttpsProxyAgent | undefined {
  // HttpsProxyAgent always TLS-upgrades after CONNECT, so it's only valid for wss/https targets.
  let target: URL;
  try {
    target = new URL(url);
  }
  catch {
    return undefined;
  }
  if (target.protocol !== "https:" && target.protocol !== "wss:") return undefined;

  const proxyUrl = resolveProxy(url);
  if (!proxyUrl) return undefined;
  console.log(`Using HTTP proxy ${proxyUrl.protocol}//${proxyUrl.host}`);
  return new HttpsProxyAgent(proxyUrl);
}

function matchesNoProxy(hostname: string, noProxy: string): boolean {
  const lowered = hostname.toLowerCase();
  for (const raw of noProxy.split(",")) {
    const entry = raw.trim();
    if (!entry) continue;
    if (entry === "*") return true;
    const host = entry.split(":")[0].toLowerCase().replace(/^\./, "");
    if (lowered === host || lowered.endsWith("." + host)) return true;
  }
  return false;
}

export class HttpsProxyAgent extends HttpsAgent {
  private readonly proxy: URL;

  constructor(proxy: URL) {
    super();
    this.proxy = proxy;
  }

  // deno-lint-ignore no-explicit-any
  override createConnection(options: any, callback?: (err: Error | null, stream: Duplex) => void): Duplex {
    const proxyHost = this.proxy.hostname;
    const proxyPort = Number(this.proxy.port) || (this.proxy.protocol === "https:" ? 443 : 80);
    const proxyIsTls = this.proxy.protocol === "https:";

    const proxySocket: net.Socket = proxyIsTls
      ? tls.connect({ host: proxyHost, port: proxyPort, servername: proxyHost })
      : net.connect({ host: proxyHost, port: proxyPort });

    let buffer = Buffer.alloc(0);
    let settled = false;

    const settle = (err: Error | null, sock?: Duplex): void => {
      if (settled) return;
      settled = true;
      proxySocket.removeListener("data", onData);
      proxySocket.removeListener("error", onError);
      proxySocket.removeListener("end", onEnd);
      if (err) proxySocket.destroy();
      callback?.(err, sock as Duplex);
    };

    const onData = (chunk: Buffer): void => {
      buffer = Buffer.concat([buffer, chunk]);
      const headerEnd = buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) return;

      const headers = buffer.subarray(0, headerEnd).toString("ascii");
      const statusLine = headers.split("\r\n")[0];
      const match = statusLine.match(/^HTTP\/1\.[01] (\d{3})/);
      if (!match || match[1] !== "200") {
        settle(new Error(`Proxy CONNECT failed: ${statusLine}`));
        return;
      }

      // Replay any bytes that arrived after the CONNECT response so the TLS handshake sees them.
      const leftover = buffer.subarray(headerEnd + 4);
      if (leftover.length > 0) {
        proxySocket.unshift(leftover);
      }

      const tlsSocket = tls.connect({
        socket: proxySocket,
        servername: options.servername || options.host,
        ALPNProtocols: options.ALPNProtocols,
      });
      settle(null, tlsSocket);
    };

    const onError = (err: Error): void => settle(err);
    const onEnd = (): void => settle(new Error("Proxy connection closed before CONNECT response"));

    const sendConnect = (): void => {
      const target = `${options.host}:${options.port}`;
      const auth = this.proxy.username
        ? `Proxy-Authorization: Basic ${btoa(`${decodeURIComponent(this.proxy.username)}:${decodeURIComponent(this.proxy.password)}`)}\r\n`
        : "";
      proxySocket.write(
        `CONNECT ${target} HTTP/1.1\r\n` +
          `Host: ${target}\r\n` +
          auth +
          `\r\n`,
      );
    };

    proxySocket.once(proxyIsTls ? "secureConnect" : "connect", sendConnect);
    proxySocket.on("data", onData);
    proxySocket.once("error", onError);
    proxySocket.once("end", onEnd);

    // Node's http.Agent only consults the callback when createConnection returns a falsy value, so the cast is intentional.
    return undefined as unknown as Duplex;
  }
}
