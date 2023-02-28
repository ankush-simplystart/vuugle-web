import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AddressComponent } from './address/address.component';
import { AddressListingComponent } from './address/address-listing/address-listing.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentMethodComponent } from './payment/payment-method/payment-method.component';
import { AddCardComponent } from './payment/add-card/add-card.component';
import { PaymentConfirmationComponent } from './payment/payment-confirmation/payment-confirmation.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderSummaryComponent,
    AddressComponent,
    AddressListingComponent,
    AddAddressComponent,
    PaymentComponent,
    PaymentMethodComponent,
    AddCardComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
