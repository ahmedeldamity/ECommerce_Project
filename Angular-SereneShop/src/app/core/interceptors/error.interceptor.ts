import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _Router:Router, private _ToastrService:ToastrService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error){
          if(error.status === 400){
            if(error.error.errors){
              throw error.error;
            }else{
              this._ToastrService.error(error.error.message, error.status.toString())
            }
          }
          if(error.status === 401){
            this._ToastrService.error(error.error.message, error.status.toString())
          }
          if(error.status === 404){
            this._Router.navigateByUrl('/not-found');
          }
          if(error.status === 500){
            console.log("ss")
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            this._Router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
