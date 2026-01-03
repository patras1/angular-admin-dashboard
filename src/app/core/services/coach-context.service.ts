import { Injectable } from "@angular/core";
import { Coach, CoachProfile } from "../models/coach.model";
import { BehaviorSubject, delay, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class CoachContextService {

  private readonly coachSubject = new BehaviorSubject<Coach | null>(null);
  readonly coach$ = this.coachSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 🔹 Async data fetch (NO state mutation here)
  loadCoachById(coachId: string): Observable<Coach> {
    return this.http
      .get<CoachProfile[]>('/assets/data/coaches.json')
      .pipe(
        delay(800),
        map(coaches => {
          const coach = coaches.find(c => c.id === coachId);
          if (!coach) throw new Error('Coach not found');

          return {
            id: coach.id,
            profile: {
              id: coach.id,
              name: coach.name,
              bio: coach.bio ?? '',
              specialty: coach.specialty ?? 'Nutrition',
              email: coach.email,
              gender: coach.gender,
            },
          } as Coach;
        })
      );
  }

  // 🔹 State update ONLY
  updateCoach(coach: Coach): void {
    this.coachSubject.next(coach);
  }

  // 🔹 Partial update (from forms)
  updateProfile(profile: Partial<CoachProfile>): void {
    const current = this.coachSubject.value;
    if (!current) return;

    this.coachSubject.next({
      ...current,
      profile: {
        ...current.profile,
        ...profile,
      },
    });
  }

  
}
