import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddressListingComponent } from '../address/address-listing/address-listing.component';
import { PaymentMethodComponent } from '../payment/payment-method/payment-method.component';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  openMyAddressSheet(): void {
    this._bottomSheet.open(AddressListingComponent,{
      panelClass: 'address-listing-bottomsheet'
    });
  }

  openPaymentMethodSheet(): void {
    this._bottomSheet.open(PaymentMethodComponent,{
      panelClass: 'payment-method-bottomsheet'
    });
  }

  ngOnInit(): void {
  }

}
