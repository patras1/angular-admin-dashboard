import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RulesEngine {
  // Store of enabled feature flags
  private enabledFeatures = signal<Record<string, boolean>>({});

  /**
   * Check if a feature is enabled
   * @param key The feature flag key
   * @returns A computed signal that returns true if the feature is enabled
   */
  isEnabled(key: string) {
    return computed(() => this.enabledFeatures()[key] ?? false);
  }

  /**
   * Enable a feature flag
   * @param key The feature flag key
   */
  enable(key: string): void {
    this.enabledFeatures.update(features => ({
      ...features,
      [key]: true
    }));
  }

  /**
   * Disable a feature flag
   * @param key The feature flag key
   */
  disable(key: string): void {
    this.enabledFeatures.update(features => ({
      ...features,
      [key]: false
    }));
  }

  /**
   * Set a feature flag value
   * @param key The feature flag key
   * @param value The value to set
   */
  setFeature(key: string, value: boolean): void {
    this.enabledFeatures.update(features => ({
      ...features,
      [key]: value
    }));
  }
}

