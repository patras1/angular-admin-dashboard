import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { CoachLogin } from '../models/coach.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.get<CoachLogin[]>('/assets/data/coaches.json').pipe(
      delay(800),
      map(coaches => {
        const coach = coaches.find(c => c.email === email && c.password === password);
        if (!coach) throw new Error('Invalid credentials');
        return coach.id;
      })
    );
  }
}
