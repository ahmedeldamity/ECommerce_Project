import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/interfaces/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  constructor(public _BasketService:BasketService){ }

  incrementQuantity(item: BasketItem){
    this._BasketService.addItemToBasket(item);
  }

  removeItem(event: {id: number, quantity:number}){
    this._BasketService.removeItemFromBasket(event.id, event.quantity);
  }

}
