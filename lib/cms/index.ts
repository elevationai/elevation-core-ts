import { BaseService } from "../shared/base.ts";
import { EMPTY, firstValueFrom, from, type Observable, of } from "rxjs";
import { catchError, map, share, tap } from "rxjs/operators";

// CMS Interfaces matching the reference library
export interface ICMS {
  _id: string;
  area: string;
  page: string;
  element: string;
  languages: { [languageCode: string]: Language };
  organization: string;
}

export interface Language {
  versions: LanguageVersion[];
}
export interface LanguageVersion {
  name: string;
  created: Date;
  displayDates: DisplayDate[];
  order: number;
  string: string;
  modified: Date;
  publishes: Publish[];
}

export interface Publish {
  published: Date;
  string: string;
  author: {
    id: string;
    displayName: string;
    email: string;
  };
}

export interface DisplayDate {
  startDate: Date | null;
  endDate: Date | null;
}

export class CMS extends BaseService {
  public stringsObservable: Observable<ICMS[]> | null = null;

  private cmsCache: Map<string, string> = new Map();
  private allStrings: ICMS[] | null = null;
  private reqHeaderNoCache = { "Cache-Control": "no-cache" };

  /**
   * Get a specific key from CMS
   * @param key - The CMS key to retrieve
   * @param lan - Language code (e.g., 'en', 'es', 'fr')
   * @param isConfig - Whether this is a configuration string
   * @returns The CMS string or null if not found
   */
  async getKey(key: string, lan: string, isConfig: boolean = false, allowCache = true): Promise<string | null> {
    this.checkConfiguration();

    // If cache is allowed and cache exists, return from cache
    if (allowCache && this.allStrings?.length) {
      const cached = this.cmsCache.get(`${key}-${lan}`);
      const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
      const found = cached !== undefined ? cached : cachedLangFallback !== undefined ? cachedLangFallback : null;
      return isConfig && found ? JSON.parse(found) : found;
    }

    // If cache is not allowed or cache is not loaded, load all strings
    if (!allowCache || !this.allStrings?.length) {
      // Subscribe to loadAllStrings and wait for completion
      try {
        await firstValueFrom(this.loadAllStrings(isConfig));
      }
      catch (error) {
        // If loading fails, continue with empty cache
        console.error("Failed to load strings for key lookup:", error);
      }

      // Check cache again after loading
      const cached = this.cmsCache.get(`${key}-${lan}`);
      const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
      const found = cached !== undefined ? cached : cachedLangFallback !== undefined ? cachedLangFallback : null;
      return isConfig && found ? JSON.parse(found) : found;
    }

    return null;
  }

  /**
   * Get multiple keys from CMS
   * @param keys - The array of CMS keys to retrieve
   * @param lan - Language code (e.g., 'en', 'es', 'fr')
   * @param allowCache - Whether to allow cached values
   * @returns Array of CMS strings or null for each key if not found
   */
  async getKeys(keys: string[], lan: string, allowCache = true): Promise<(string | null)[]> {
    this.checkConfiguration();

    // If cache is allowed and cache exists, return from cache
    if (allowCache && this.allStrings?.length) {
      return keys.map((key) => {
        const cached = this.cmsCache.get(`${key}-${lan}`);
        const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
        return cached !== undefined ? cached : cachedLangFallback !== undefined ? cachedLangFallback : null;
      });
    }

    // If cache is not allowed or cache is not loaded, load all strings
    if (!allowCache || !this.allStrings?.length) {
      // Subscribe to loadAllStrings and wait for completion
      try {
        await firstValueFrom(this.loadAllStrings(!allowCache));
      }
      catch (error) {
        // If loading fails, continue with empty cache
        console.error("Failed to load strings for keys lookup:", error);
      }

      // Check cache again after loading
      return keys.map((key) => {
        const cached = this.cmsCache.get(`${key}-${lan}`);
        const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
        return cached !== undefined ? cached : cachedLangFallback !== undefined ? cachedLangFallback : null;
      });
    }

    return keys.map(() => null);
  }

  /**
   * Get a string value directly (convenience method)
   */
  getString(key: string, lan: string, allowCache = true): Promise<string | null> {
    return this.getKey(key, lan, false, allowCache);
  }

  /**
   * Get a configuration value
   */
  getConfig(key: string, lan: string, allowCache = true): Promise<string | null> {
    return this.getKey(key, lan, true, allowCache);
  }

  /**
   * Get all unique language codes from CMS
   * @param allowCache - Whether to allow cached values
   * @returns Array of unique language codes
   */
  async getLangs(allowCache = true): Promise<string[]> {
    this.checkConfiguration();

    // If cache is not allowed or cache is not loaded, load all strings
    if (!allowCache || !this.allStrings?.length) {
      try {
        await firstValueFrom(this.loadAllStrings(!allowCache));
      }
      catch (error) {
        console.error("Failed to load strings for getLangs:", error);
        return [];
      }
    }

    // Iterate through all strings and collect unique language codes
    const langSet = new Set<string>();
    if (this.allStrings) {
      for (const cms of this.allStrings) {
        for (const langCode of Object.keys(cms.languages)) {
          langSet.add(langCode);
        }
      }
    }

    return Array.from(langSet);
  }

  /**
   * Load all CMS strings for the organization
   * Returns an Observable that is shared when called multiple times rapidly
   */
  loadAllStrings(disableCache = false): Observable<ICMS[]> {
    this.checkConfiguration();

    // If already loading and not forcing refresh, return the existing observable
    if (!disableCache && this.stringsObservable) {
      return this.stringsObservable;
    }

    // If we have cached data and not forcing refresh, return it as an observable
    if (!disableCache && this.allStrings && this.allStrings.length > 0) {
      return of(this.allStrings);
    }

    // Create new loading observable
    this.stringsObservable = from(
      this.get(
        `/strings`,
        disableCache ? this.reqHeaderNoCache : undefined,
      ),
    ).pipe(
      map((response) => {
        if (!response.success || !response.data) {
          throw new Error("Failed to load CMS strings");
        }
        return response.data as ICMS[];
      }),
      tap((data) => {
        this.allStrings = data;
        // Update cache with loaded strings
        this.updateCacheFromStrings(this.allStrings);
      }),
      catchError((error) => {
        console.error("Failed to load CMS strings:", error);
        // Clear the loading observable on error
        this.stringsObservable = null;
        return EMPTY;
      }),
      // Share the observable among multiple subscribers
      share(),
      tap({
        complete: () => {
          // Clear loading observable after completion
          setTimeout(() => {
            this.stringsObservable = null;
          }, 0);
        },
      }),
    );

    return this.stringsObservable;
  }

  /**
   * Get all loaded strings
   */
  getAllStrings(): ICMS[] | null {
    return this.allStrings;
  }

  /**
   * Clear the local cache
   */
  clearCache(): void {
    this.cmsCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cmsCache.size,
      keys: Array.from(this.cmsCache.keys()),
    };
  }

  /**
   * Private method to update cache from loaded strings
   */
  private updateCacheFromStrings(strings: ICMS[]): void {
    for (const cms of strings) {
      for (const [langCode, langData] of Object.entries(cms.languages)) {
        const cacheKey = `${cms.element}-${langCode}`;

        try {
          // Get the base and selected version
          const baseVersion = langData.versions.find((v) => v.name === "base");
          let selectedVersion = this.coreInfo?.version ? langData.versions.find((v) => v.name === this.coreInfo?.version) : undefined;
          if (selectedVersion && selectedVersion.displayDates?.length) {
            // if the version has schedule, then check it's in range
            const match = selectedVersion.displayDates.find((range) =>
              (range.startDate === null || new Date(range.startDate).getTime() < new Date().getTime()) &&
              (range.endDate === null || new Date(range.endDate).getTime() > new Date().getTime())
            );

            // it's out of range, clear selectedVersion
            if (!match) selectedVersion = undefined;
          }

          if (this.coreInfo?.isDraft) {
            const draft = selectedVersion || baseVersion;
            if (draft) this.cmsCache.set(cacheKey, draft.string);
          }
          else {
            const lastPublish = selectedVersion?.publishes?.[0] || baseVersion?.publishes?.[0];
            if (lastPublish) this.cmsCache.set(cacheKey, lastPublish?.string);
          }
        }
        catch (err) {
          console.error("Failed to update cache", err);
        }
      }
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.clearCache();
    this.allStrings = null;
  }
}

// Export singleton instance
export const cms: CMS = new CMS();
