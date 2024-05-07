import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../core/pipes/search.pipe';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    FormsModule,
    SearchPipe
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
