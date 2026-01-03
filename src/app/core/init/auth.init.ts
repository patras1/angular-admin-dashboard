import { AuthContextService } from '../services/auth-context.service';

export function initAuth(authContext: AuthContextService) {
  return () => {
    const coachId = localStorage.getItem('coachId');
    if (coachId) {
      authContext.setAuthenticatedCoachId(coachId);
    }
  };
}