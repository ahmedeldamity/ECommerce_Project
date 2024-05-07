import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { HomeModule } from './home/home.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, // this to import app-routing.module.ts and this file import RouterModule and exporting it to her (because I import it in this file) and RouterModule has all properties of router like (<router-outlet>, <routerlink>) so I not import this properties her
    HttpClientModule, // this because I need to impoort httpClient in services (note: services providedIn: 'root' so I can use it any where and it see this import whatever where is it)
    CoreModule,       // I import this module to use nav-bar because nav-bar in core module
    // ShopModule,    // I import it in app-routing for lazy loading
    HomeModule,
    NgxSpinnerModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
