import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initAuth } from './core/init/auth.init';
import { AuthContextService } from './core/services/auth-context.service';
import { CoachContextService } from './core/services/coach-context.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (authContext: AuthContextService, coachContext: CoachContextService) => {
        return () => {
          const coachId = localStorage.getItem('coachId');
          if (coachId) {
            authContext.setAuthenticatedCoachId(coachId);
            // Load the coach data
            return coachContext.loadCoachById(coachId).toPromise().then(coach => {
              if (coach) {
                coachContext.updateCoach(coach);
              }
            });
          }
          return Promise.resolve();
        };
      },
      deps: [AuthContextService, CoachContextService],
      multi: true
    }
  ]
};
