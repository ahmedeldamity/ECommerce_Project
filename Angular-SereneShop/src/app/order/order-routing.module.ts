import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderDetailedComponent } from '../order-detailed/order-detailed.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: ':id', component: OrderDetailedComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
