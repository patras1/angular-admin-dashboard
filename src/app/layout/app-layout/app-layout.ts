import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { RulesEngine } from '../../core/services/rules-engine.service';
import { AppSidebar } from '../app-sidebar/app-sidebar';
import { AppHeader } from '../app-header/app-header';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, AppSidebar, AppHeader],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {

  // 👇 this connects layout to rules
  private rulesEngine = inject(RulesEngine);

  showRulesMenu = this.rulesEngine.isEnabled('show.rules.menu');

}