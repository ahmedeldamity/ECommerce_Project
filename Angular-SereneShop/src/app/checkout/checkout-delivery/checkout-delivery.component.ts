import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { DeliveryMethod } from './../../shared/interfaces/deliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm?: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(private _CheckoutService:CheckoutService, private _BasketService:BasketService){}

  ngOnInit(): void {
    this._CheckoutService.getDeliveryMethods().subscribe({
      next: (response) => {
        this.deliveryMethods = response;
      }
    });
  }

  setShippingPrice(deliveryMethod :DeliveryMethod){
    this._BasketService.setShippingPrice(deliveryMethod);
  }

}
