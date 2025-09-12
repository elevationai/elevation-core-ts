import { BaseService } from '../shared/base.ts';
import { EventEmitter } from '../shared/utils.ts';
import type { CoreInfo } from '../../types/index.ts';

// CMS Interfaces matching the reference library
export interface LanguageVersion {
  name: string;
  "date-created": string;
  "display-date": [
    {
      "start-date": null | string;
      "end-date": null | string;
    }
  ];
  order: number;
  author: null | string;
  published: boolean;
  string: string;
  "last-updated": string;
}

export interface Language {
  versions: LanguageVersion[];
}

export interface ICMS {
  _id: string;
  area: string;
  page: string;
  element: string;
  languages: { [languageCode: string]: Language };
  organization: string;
}

export interface CMSString {
  key: string;
  content: string;
  language: string;
  version: number;
  isConfig: boolean;
}

export class CMS extends BaseService {
  // Observable for reactive programming (using EventEmitter instead of RxJS)
  public stringsObservable: EventEmitter<ICMS[] | null> = new EventEmitter<ICMS[] | null>();
  
  private cmsCache: Map<string, string> = new Map();
  private allStrings: ICMS[] | null = null;
	private reqHeaderNoCache = { 'Cache-Control': 'no-cache' };

  override config(coreInfo: CoreInfo): void {
    super.config(coreInfo);
    this.refreshInfo(coreInfo);
  }

  /**
   * Refresh CMS information and reload strings
   */
  refreshInfo(info: CoreInfo): void {
    this.config(info);
  }

  /**
   * Get a specific key from CMS
   * @param key - The CMS key to retrieve
   * @param lan - Language code (e.g., 'en', 'es', 'fr')
   * @param isConfig - Whether this is a configuration string
   * @returns The CMS string or null if not found
   */
  async getKey(key: string, lan: string, isConfig: boolean = false): Promise<CMSString | string | null> {
    this.checkConfiguration();
    
    if (!isConfig) {
      const cached = this.cmsCache.get(`${key}-${lan}`);
      const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
      return cached !== undefined ? cached : cachedLangFallback !== undefined ? cachedLangFallback : null;
    }

    // If not in cache, try to reload all strings first
    if (!this.allStrings || this.allStrings.length === 0 || isConfig) {
      await this.loadAllStrings(isConfig);
      
      // Check cache again after loading
      const cached = this.cmsCache.get(`${key}-${lan}`);
      const cachedLangFallback = this.cmsCache.get(`${key}-en-US`);
      const found = cached !== undefined ? cached : cachedLangFallback !== undefined ? cachedLangFallback : null;
      return isConfig && found ? JSON.parse(found) : found;
    }
    
    return null;
  }

  /**
   * Get a string value directly (convenience method)
   */
  async getString(key: string, lan: string): Promise<string | null> {
    const result = await this.getKey(key, lan, false);
    if (typeof result === 'string') {
      return result;
    }
    return result?.content || null;
  }

  /**
   * Get a configuration value
   */
  async getConfig(key: string, lan: string): Promise<string | null> {
    const result = await this.getKey(key, lan, true);
    if (typeof result === 'string') {
      return result;
    }
    return result?.content || null;
  }

  /**
   * Load all CMS strings for the organization
   */
  async loadAllStrings(disableCache = false): Promise<void> {
    this.checkConfiguration();

    try {
      const response = await this.get(`${this.coreInfo?.serviceEndpoint}/strings`, disableCache ? this.reqHeaderNoCache : undefined);
      
      if (response.success && response.data) {
        this.allStrings = response.data as ICMS[];
        this.stringsObservable.emit(this.allStrings);
        
        // Update cache with loaded strings
        this.updateCacheFromStrings(this.allStrings);
      }
    } catch (error) {
      console.error('Failed to load CMS strings:', error);
      this.stringsObservable.emit(null);
    }
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
      keys: Array.from(this.cmsCache.keys())
    };
  }

  /**
   * Private method to update cache from loaded strings
   */
  private updateCacheFromStrings(strings: ICMS[]): void {
    for (const cms of strings) {
      for (const [langCode, langData] of Object.entries(cms.languages)) {
        // Get the latest published version
        const publishedVersion = langData.versions.find(v => v.published) || langData.versions[0];
        
        if (publishedVersion) {
          const cacheKey = `${cms.element}-${langCode}`;
          this.cmsCache.set(cacheKey, publishedVersion.string);
        }
      }
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.clearCache();
    this.stringsObservable.clear();
    this.allStrings = null;
  }
}

// Export singleton instance
export const cms: CMS = new CMS();