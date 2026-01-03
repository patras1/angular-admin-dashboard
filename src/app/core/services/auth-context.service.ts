import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthContextService{
    private readonly authSubject = new BehaviorSubject<string|null>(null)
    readonly auth$ = this.authSubject.asObservable();

    setAuthenticatedCoachId(coachId:string){
        this.authSubject.next(coachId)
    }

    clear():void{
        this.authSubject.next(null);
    }

    get currentCoachId():string| null {
        return this.authSubject.value;
    }
}