// Generate UUID using Web Crypto API
export function uuid(): string {
  return crypto.randomUUID();
}

// Debounce helper
export class Debouncer<T extends (...args: any[]) => any> {
  private timeoutId: number | null = null;
  private lastCall = 0;

  constructor(
    private fn: T,
    private delay: number,
  ) {}

  call(...args: Parameters<T>): void {
    const now = Date.now();

    if (now - this.lastCall < this.delay) {
      return; // Skip if within debounce period
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.lastCall = now;
    this.fn(...args);
  }

  async callAsync(...args: Parameters<T>): Promise<ReturnType<T> | void> {
    const now = Date.now();

    if (now - this.lastCall < this.delay) {
      return; // Skip if within debounce period
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.lastCall = now;
    return await this.fn(...args);
  }

  reset(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.lastCall = 0;
  }
}

// Simple in-memory cache
export class Cache<T> {
  private cache = new Map<string, { value: T; expires: number }>();
  private cleanupInterval: number | null = null;

  constructor(
    private ttl = 60000, // Default 1 minute
    autoCleanup = true,
  ) {
    if (autoCleanup) {
      this.startAutoCleanup();
    }
  }

  set(key: string, value: T, customTtl?: number): void {
    const expires = Date.now() + (customTtl || this.ttl);
    this.cache.set(key, { value, expires });
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key);

    if (!item) {
      return undefined;
    }

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private startAutoCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now > item.expires) {
          this.cache.delete(key);
        }
      }
    }, this.ttl);
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as any;
  }

  if (obj instanceof Object) {
    const clonedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}
