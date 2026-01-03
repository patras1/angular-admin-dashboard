import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PreferencesContextService } from '../../core/services/preferences-contect.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { Preferences } from '../../core/models/preferences.model';
import { AuthContextService } from '../../core/services/auth-context.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe,NgClass],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AppSidebar {

  preferences$: Observable<Preferences | null>;

  constructor(
    private preferencesContext: PreferencesContextService,
    private authContext: AuthContextService,
    private router:Router
  ) {
    this.preferences$ = this.preferencesContext.preferences$;
  }
    
  toggleTheme(): void {
    this.preferencesContext.toggleTheme();
  }

  setLanguage(language: 'en' | 'es'): void {
    this.preferencesContext.setLanguage(language);
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value as 'en' | 'es';
    this.setLanguage(language);
  }
  logout(): void {
  localStorage.removeItem('coachId');
  this.authContext.clear();
  this.router.navigateByUrl('/login');
}
}


