import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private _BasketService:BasketService, private _AccountService:AccountService){}
  title = 'SereneShop';

  ngOnInit(): void {
    this.loadBasket();
    this.loadCureentUser();
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    basketId && this._BasketService.getBasket(basketId);
  }

  loadCureentUser(){
    const token = localStorage.getItem('token');
    token && this._AccountService.loadCurrentUser(token).subscribe();
  }
}
