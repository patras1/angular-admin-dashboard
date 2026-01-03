import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppContext {
  env = signal<'dev' | 'prod'>('dev');
}