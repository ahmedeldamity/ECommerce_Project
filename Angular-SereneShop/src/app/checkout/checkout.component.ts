import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  constructor(private _FormBuilder:FormBuilder, private _AccountService:AccountService,
    private _BasketService:BasketService){}

  ngOnInit(): void {
    this.getAddressFormValue();
    this.getDeliveryMethodValue();
  }

  checkoutForm = this._FormBuilder.group({
    addressForm: this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    }),
    deliveryForm: this._FormBuilder.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this._FormBuilder.group({
      nameOnCard: ['', Validators.required]
    })
  })

  getAddressFormValue(){
    this._AccountService.getUserAddress().subscribe({
      next: (address) => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    });
  }

  getDeliveryMethodValue(){
    const basket = this._BasketService.getCurrentBasketValue();
    if(basket && basket.deliveryMethodId){
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.patchValue(basket.deliveryMethodId.toString());
    }
  }

}
