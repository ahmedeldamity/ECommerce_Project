import { Component, Input } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?: Product;

  constructor(private _BasketService:BasketService){}

  addItemToBasekt(){
    this.product && this._BasketService.addItemToBasket(this.product);
  }


}
