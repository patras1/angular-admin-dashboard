import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Preferences } from "../models/preferences.model";


@Injectable({ providedIn: 'root' })
export class PreferencesContextService {
    // The Subject creates and owns the state.
    private readonly preferencesSubject = new BehaviorSubject<Preferences | null>(null);
    // The Observable exposes it safely.
    readonly preferences$ = this.preferencesSubject.asObservable();
  
    loadPreferences(): void {
        // The value is immutable.
        // The value is shared across the entire application.
        this.preferencesSubject.next({
            theme: 'dark',
            language: 'en',
            units: 'metric'
        });
    }

    setTheme(theme: 'light' | 'dark'): void {

        const currentPreferences = this.preferencesSubject.value;
        if (!currentPreferences) return;
        
        this.preferencesSubject.next({
            ...currentPreferences,
            theme
        });
        
    }

    toggleTheme(): void {
        const currentPreferences = this.preferencesSubject.value;
        if (!currentPreferences) return;

        this.setTheme(currentPreferences.theme === 'light' ? 'dark' : 'light');
    }

    setLanguage(language: 'en' | 'es'): void {
        const currentPreferences = this.preferencesSubject.value;
        if (!currentPreferences) return;
      
        this.preferencesSubject.next({...currentPreferences, language});
    }

    getCurrentLanguage(): 'en' | 'es' {
        return this.preferencesSubject.value?.language || 'en';
    }
}