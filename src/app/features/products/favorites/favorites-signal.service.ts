import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesSignalService {
  //State signal
  private readonly favoritesIds = signal<number[]>([]);

  //Public readonly signal
  readonly favorites = computed(() => this.favoritesIds());

  //Derived state
  readonly count = computed(() => this.favoritesIds().length);

  isFavorite(id: number): boolean {
    return this.favoritesIds().includes(id);
  }

  toggle(id: number): void {
    const current = this.favoritesIds();

    if (current.includes(id)) {
      this.favoritesIds.set(current.filter(x => x !== id));
    } else {
      this.favoritesIds.set([...current, id]);
    }
  }

  clear(): void {
    this.favoritesIds.set([]);
  }
}
