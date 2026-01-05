import { Component, EventEmitter, Output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Preferences } from '../../core/models/preferences.model';
import { PreferencesContextService } from '../../core/services/preferences-contect.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  headerTitle = signal('Admin Dashboard');
  preferences$: Observable<Preferences | null>;
  @Output() menuClick = new EventEmitter<void>();

  constructor(private router: Router, private preferencesContext: PreferencesContextService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.headerTitle.set(this.router.url.split('/').pop() || 'Admin Dashboard');
    });
    this.preferences$ = this.preferencesContext.preferences$;
  }
  
  getLanguage(): string {
    if( this.preferencesContext.getCurrentLanguage() === 'en' ){
      return 'English';
    } else if( this.preferencesContext.getCurrentLanguage() === 'es' ){
      return 'Spanish';
    } else {
      return 'Unknown';
    };
  }
  
}
