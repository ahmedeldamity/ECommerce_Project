import { Component } from '@angular/core';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent {
  constructor(public _BasketService:BasketService){}

  
}
