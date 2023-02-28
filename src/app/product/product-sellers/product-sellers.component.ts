import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SellerDetailComponent } from './seller-detail/seller-detail.component';

@Component({
  selector: 'app-product-sellers',
  templateUrl: './product-sellers.component.html',
  styleUrls: ['./product-sellers.component.css']
})
export class ProductSellersComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  openSellerDetailSheet(): void {
    this._bottomSheet.open(SellerDetailComponent,{
      panelClass: 'seller-detail-bottomsheet'
    });
  }

  closeSellerSheet(): void {
    this._bottomSheet.dismiss();
  }


  ngOnInit(): void {
  }

}
