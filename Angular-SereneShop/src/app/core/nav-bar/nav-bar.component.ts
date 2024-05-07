import { Component } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { BasketItem } from '../../shared/interfaces/basket';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(public _BasketService:BasketService, public _AccountService:AccountService){}
}
