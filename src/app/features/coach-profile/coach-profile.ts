import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { CoachContextService } from '../../core/services/coach-context.service';
import { Coach } from '../../core/models/coach.model';
import { Observable } from 'rxjs';
import { CoachProfileEditComponent } from './components/coach-profile-edit/coach-profile-edit.component';
@Component({
  selector: 'app-coach-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CoachProfileEditComponent],
  templateUrl: './coach-profile.html',
  styleUrl: './coach-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachProfile {
  coach$: Observable<Coach | null>;

  constructor(
    private readonly coachContext: CoachContextService
  ) {
    this.coach$ = this.coachContext.coach$;
  }
}
