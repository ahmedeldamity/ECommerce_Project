import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { AccountService } from "../../account/account.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token?:string;

  constructor(private _AccountService:AccountService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this._AccountService.currentUser$.pipe(take(1)).subscribe({
      next: (response) => {
        this.token = response?.token;
      }
    });

    if(this.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      })
    }

    return next.handle(request);
  }
}
