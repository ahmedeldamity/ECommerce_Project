import { Component, OnInit } from '@angular/core';
import { OrdersService } from './order.service';
import { Order } from '../shared/interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private _OrdersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._OrdersService.getOrdersForUser().subscribe({
      next: (orders) => {
        this.orders = orders;
      }
    });
  }
}
