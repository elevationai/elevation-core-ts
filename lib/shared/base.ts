import type { ApiResponse, CoreInfo } from "../../types/index.ts";

export abstract class BaseService {
  protected coreInfo: CoreInfo | null = null;
  protected configured = false;
  protected headers: Headers = new Headers();

  public config(coreInfo: CoreInfo): void {
    this.validateCoreInfo(coreInfo);
    this.coreInfo = coreInfo;
    this.setupHeaders();
    this.configured = true;
  }

  public refreshInfo(info: CoreInfo): void {
    this.config(info);
  }

  protected validateCoreInfo(coreInfo: CoreInfo): void {
    if (!coreInfo.token) {
      throw new Error("Token is required in CoreInfo");
    }
    if (!coreInfo.serviceEndpoint) {
      throw new Error("Service endpoint is required in CoreInfo");
    }
  }

  protected setupHeaders(): void {
    if (!this.coreInfo) return;

    this.headers = new Headers({
      "Elevated-Auth": btoa(this.coreInfo.token),
      "Content-Type": "application/json",
    });
  }

  protected checkConfiguration(): void {
    if (!this.configured || !this.coreInfo) {
      throw new Error("Service not configured. Call config() first with CoreInfo");
    }
  }

  private getHeadersObject(headers: Headers): Record<string, string> {
    const headersObj: Record<string, string> = {};
    // Cross-platform way to iterate headers
    headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    return headersObj;
  }

  protected async makeRequest<T = unknown>(
    path: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    this.checkConfiguration();

    const url = `${this.coreInfo!.serviceEndpoint}${path}`;
    const timeout = this.coreInfo!.timeout || 30000;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeadersObject(this.headers),
          ...this.getHeadersObject(new Headers(options.headers || {})),
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    }
    catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            error: "Request timeout",
            message: `Request timed out after ${timeout}ms`,
          };
        }
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: false,
        error: "Unknown error occurred",
      };
    }
  }

  protected post<T = unknown>(path: string, data: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(path, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  protected patch<T = unknown>(path: string, data: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(path, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  protected get<T = unknown>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(path, {
      method: "GET",
      headers,
    });
  }

  protected put<T = unknown>(path: string, data: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(path, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  protected delete<T = unknown>(path: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(path, {
      method: "DELETE",
    });
  }
}
