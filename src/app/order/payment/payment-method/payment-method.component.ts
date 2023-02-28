import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddCardComponent } from '../add-card/add-card.component';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  openAddCardSheet(): void {
    this._bottomSheet.open(AddCardComponent,{
      panelClass: 'add-card-bottomsheet'
    });
  }

  closePaymentMethodSheet(): void {
    this._bottomSheet.dismiss();
  }

  closeSellerSheet(): void {
    this._bottomSheet.dismiss();
  }

  ngOnInit(): void {
  }

}
