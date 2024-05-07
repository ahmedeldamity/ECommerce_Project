import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from '../../shared/interfaces/product';
import { BasketService } from '../../basket/basket.service';
import { take } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  constructor(private _ShopService:ShopService, private _ActivatedRoute:ActivatedRoute,
    private _BasketService:BasketService){}
  product?:Product;
  quantity = 1;
  quantityInBasket = 0;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    let id = this._ActivatedRoute.snapshot.paramMap.get('id');
    if(id)
    {
      this._ShopService.getProduct(+id).subscribe({
        next: (response) => {
          this.product = response;
          this._BasketService.basketSource$.pipe(take(1)).subscribe({
            next: (response) => {
              const item = response?.items.find(x => x.id.toString() === id);
              if(item){
                this.quantity = item.quantity;
                this.quantityInBasket = item.quantity;
              }
            }
          });
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    this.quantity--;
  }

  updateQuantity(){
    if(this.product){
      if(this.quantity > this.quantityInBasket){
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this._BasketService.addItemToBasket(this.product, itemsToAdd);
      }
      else{
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this._BasketService.removeItemFromBasket(this.product.id, itemsToRemove)
      }
    }
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    items: 1,
    nav: false
  }

}
