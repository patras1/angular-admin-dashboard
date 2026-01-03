import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn:'root'})
export class FavoritesService{

    private readonly favoritesSubjest = new BehaviorSubject<number[]>(this.load());
    readonly favorites$ = this.favoritesSubjest.asObservable();

    toggle(productId:number){
        const current = this.favoritesSubjest.value;

        const next = current.includes(productId)
        ? current.filter(id=> id !== productId)
        : [...current,productId];

        this.favoritesSubjest.next(next);
        localStorage.setItem('favorites',JSON.stringify(next));
    }

    isFavorite(productId:number): boolean{
        return this.favoritesSubjest.value.includes(productId);
    }
    
    private load(): number[]{
        return JSON.parse(localStorage.getItem('favorites') ?? '[]');
    }
}