import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.css']
})
export class SellerDetailComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  closeSellerDetailSheet(): void {
    this._bottomSheet.dismiss();
  }


  ngOnInit(): void {
  }

}
