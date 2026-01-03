import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { RulesEngine } from '../services/rules-engine.service';
import { AppContext } from '../services/app-context.service';

@Injectable({ providedIn: 'root' })
export class RuleGuard implements CanActivate {

  private rulesEngine = inject(RulesEngine);
  private router = inject(Router);
  private context = inject(AppContext);

   canActivate(): boolean | UrlTree {
  if (this.context.env() === 'dev') {
    return true;
  }

  const allowed = this.rulesEngine.isEnabled('access.rules.page')();
  return allowed ? true : this.router.createUrlTree(['/preview']);
}

}
