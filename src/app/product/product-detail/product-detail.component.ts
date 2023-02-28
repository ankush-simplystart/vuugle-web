import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProductSellersComponent } from '../product-sellers/product-sellers.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  openSellerSheet(): void {
    this._bottomSheet.open(ProductSellersComponent);
  }

  ngOnInit(): void {
  }

}
