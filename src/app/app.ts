import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoachContextService } from './core/services/coach-context.service';
import { PreferencesContextService } from './core/services/preferences-contect.service';
import { AuthContextService } from './core/services/auth-context.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {

  constructor(
    private coachContext: CoachContextService,
    private authContext: AuthContextService,
    private preferencesContext: PreferencesContextService
  ) {}

  ngOnInit(): void {
    const coachId = localStorage.getItem('coachId');
    if(!coachId) return;

    this.authContext.setAuthenticatedCoachId(coachId);
    this.coachContext.loadCoachById(coachId).subscribe(coach =>{
      this.coachContext.updateCoach(coach);
    });
    this.preferencesContext.loadPreferences();
  }
}
