import { parse as parseJsonc } from "@std/jsonc";
import { BaseService } from "./shared/base.ts";
import type { ConfigFetchOptions, ConfigFetchResult } from "../types/mod.ts";

export class ConfigClient extends BaseService {
  private readonly deviceId: string;
  private readonly locationId: string;
  public version?: string;

  constructor(url: string, token: string, deviceId: string, locationId: string, timeout?: number) {
    super(url, token, timeout);

    if (!deviceId || !locationId) {
      throw new Error("Both deviceId and locationId are required");
    }

    this.deviceId = deviceId;
    this.locationId = locationId;
  }

  public getConfig(label: string): Promise<unknown> {
    return this.get<unknown>(
      `/configurations/${label}/${this.locationId}/${this.deviceId}${this.version ? `?version=${this.version}` : ""}`,
      { "Cache-Control": "no-cache" },
    )
      .then((res) => {
        return res.data || null;
      }).catch((err) => {
        console.error("Error fetching configuration:", err);
        return null;
      });
  }

  public getConfigs(labels: string[]): Promise<(unknown)[]> {
    return Promise.all(labels.map((label: string) => this.getConfig(label)));
  }

  /**
   * Fetches a configuration by label, compares it against the local .jsonc file,
   * and writes the result to disk if the configuration has changed.
   * Comments in an existing local .jsonc file are ignored during comparison.
   */
  public async fetchAndCacheConfig<T = unknown>(options: ConfigFetchOptions): Promise<ConfigFetchResult<T>> {
    const { label, filePath, force } = options;

    const configData = await this.getConfig(label);

    if (!configData) {
      throw new Error(`Configuration "${label}" returned null - config may not exist or request failed`);
    }

    const remoteContent = JSON.stringify(configData, null, 2);

    // Read and parse existing local file, stripping comments for comparison
    let localContent: string | null = null;
    let firstFetch = true;
    try {
      const localFileContent = await Deno.readTextFile(filePath);
      const parsed = parseJsonc(localFileContent);
      localContent = JSON.stringify(parsed, null, 2);
      firstFetch = false;
    }
    catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
      }
    }

    const changed = localContent === null || localContent.trim() !== remoteContent.trim();

    if (changed || force) {
      const maxBackups = options.maxBackups ?? 3;
      if (maxBackups > 0 && !firstFetch) {
        await this.rotateBackups(filePath, maxBackups);
      }
      await Deno.writeTextFile(filePath, remoteContent);
      return { updated: true, firstFetch, data: configData as T };
    }

    return { updated: false, firstFetch, data: configData as T };
  }
  private async rotateBackups(filePath: string, maxBackups: number): Promise<void> {
    // Delete the oldest backup if it exists
    try {
      await Deno.remove(`${filePath}.bak.${maxBackups}`);
    }
    catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
      }
    }

    // Rotate existing backups: .bak.2 → .bak.3, .bak.1 → .bak.2, etc.
    for (let i = maxBackups - 1; i >= 1; i--) {
      try {
        await Deno.rename(`${filePath}.bak.${i}`, `${filePath}.bak.${i + 1}`);
      }
      catch (error) {
        if (!(error instanceof Deno.errors.NotFound)) {
          throw error;
        }
      }
    }

    // Move current file to .bak.1
    try {
      await Deno.rename(filePath, `${filePath}.bak.1`);
    }
    catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
      }
    }
  }
}
