import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CoachContextService } from '../../core/services/coach-context.service';
import { mergeMap, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthContextService} from '../../core/services/auth-context.service'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly coachContext: CoachContextService,
    private readonly router: Router,
    private authContextService:AuthContextService
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const { username, password } = this.form.getRawValue();
  
    this.authService.login(username, password).pipe(
      switchMap(coachId =>
        this.coachContext.loadCoachById(coachId)
      )
    ).subscribe(coach => {
      this.coachContext.updateCoach(coach);
      this.authContextService.setAuthenticatedCoachId(coach.id);
      localStorage.setItem('coachId', coach.id);
      this.router.navigateByUrl('/coach-profile');
    });
  }
}
