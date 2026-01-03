import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { CoachContextService } from "../services/coach-context.service";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private coachContext: CoachContextService,
        private router: Router
      ) {}
      
      canActivate(): Observable<boolean | UrlTree> {
        return this.coachContext.coach$.pipe(
            take(1),
            map(coach => { 
                if(coach){
                    return true;
                }
                this.router.navigateByUrl('/login');
                return false;
            })
        );
      }
}
