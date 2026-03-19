import type { ApiResponse } from "../../types/mod.ts";

export abstract class BaseService {
  private readonly baseUrl: string;
  private readonly requestTimeout: number;
  private readonly headers: Headers;

  protected constructor(baseUrl: string, token: string, timeout?: number) {
    if (!token) {
      throw new Error("Token is required");
    }
    if (!baseUrl) {
      throw new Error("URL is required");
    }
    this.baseUrl = baseUrl;
    this.requestTimeout = timeout || 30000;
    this.headers = new Headers({
      "Elevated-Auth": btoa(token),
      "Content-Type": "application/json",
    });
  }

  private getHeadersObject(headers: Headers): Record<string, string> {
    const headersObj: Record<string, string> = {};
    // Cross-platform way to iterate headers
    headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    return headersObj;
  }

  protected async makeRequest<T = unknown>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${path}`;
    const timeout = this.requestTimeout;

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
