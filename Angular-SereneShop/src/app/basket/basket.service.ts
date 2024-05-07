import { Category } from './../shared/interfaces/category';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, BasketItem, BasketTotals } from '../shared/interfaces/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/interfaces/product';
import { DeliveryMethod } from '../shared/interfaces/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private _HttpClient:HttpClient) { }
  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  basketSource2 = new BehaviorSubject<Basket | null>(null);

  setShippingPrice(deliveryMethod: DeliveryMethod){
    const basket = this.getCurrentBasketValue();
    if(basket){
      basket.shippingPrice = deliveryMethod.cost;
      basket.deliveryMethodId = deliveryMethod.id;
      this.setBasket(basket);
    }
  }

  getBasket(id:string){
    return this._HttpClient.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket){
    console.log(basket)
    return this._HttpClient.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1){
    if(this.isProduct(item))
      item = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id:number, quantity = 1){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const item = basket.items.find(x => x.id === id);
    if(item){
      item.quantity -= quantity;
      if(item.quantity === 0){
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if(basket.items.length > 0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: Basket) {
    return this._HttpClient.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    })
  }

  deleteLocalBasket(){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd:BasketItem, quantity:number): BasketItem[]{
    const item = items.find(x => x.id === itemToAdd.id);
    if(item) item.quantity += quantity;
    else{
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: Product): BasketItem{
    item.images
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageCover: item.imageCover,
      images: item.images,
      quantity: 0,
      ratingsAverage: item.ratingsAverage,
      brand: item.brand,
      category: item.category
    }
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + basket.shippingPrice;
    this.basketTotalSource.next({
      shipping: basket.shippingPrice,
      subtotal,
      total
    });
  }

  private isProduct(item: Product | BasketItem): item is Product{
    return (item as Product).name !== undefined;
  }

  createPaymentIntent(){
    return this._HttpClient.post<Basket>(this.baseUrl + 'payment/' + this.getCurrentBasketValue()?.id, {}).pipe(
      map(basket => {
        this.basketSource.next(basket);
      })
    )
  }

}
