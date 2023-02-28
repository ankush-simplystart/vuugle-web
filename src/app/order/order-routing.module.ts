import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AddressListingComponent } from './address/address-listing/address-listing.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { PaymentConfirmationComponent } from './payment/payment-confirmation/payment-confirmation.component';

const routes: Routes = [
  {
    path: '', component: OrderComponent,
    children: [
      { path: '', redirectTo: 'order-summary', pathMatch: 'full' },
      { path: 'order-summary', component: OrderSummaryComponent },
      { path: 'address-listing', component: AddressListingComponent },
      { path: 'add-address', component: AddAddressComponent },
      { path: 'payment-confirmation', component: PaymentConfirmationComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
