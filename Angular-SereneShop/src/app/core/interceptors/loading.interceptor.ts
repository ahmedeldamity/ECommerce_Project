import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, delay, finalize, identity } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _NgxSpinnerService: NgxSpinnerService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('emailexists') || request.method === "POST" && request.url.includes('orders')){
      return next.handle(request);
    }
    this._NgxSpinnerService.show();
    return next.handle(request).pipe(
      (environment.production ? identity : delay(500)),
      finalize(() => {
      this._NgxSpinnerService.hide();
    }));
  }
}
