import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private _AccountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._AccountService.currentUser$.pipe(
      map(auth => {
        if (auth){
          console.log("true");
          return true;
        }
        else {
          console.log("false");
          this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    );
  }

}
