import { Component, inject } from '@angular/core';
import { FavoritesSignalService } from './favorites-signal.service';

@Component({
  selector: 'app-favorites-signal-demo',
  standalone: true,
  template: `
    <button (click)="toggle(1)">
      {{ favorites.isFavorite(1) ? '❤️' : '🤍' }}
    </button>

    <p>Total favorites: {{ favorites.count() }}</p>
  `,
})
export class FavoritesSignalDemoComponent {
  favorites = inject(FavoritesSignalService);

  toggle(id: number) {
    this.favorites.toggle(id);
  }
}