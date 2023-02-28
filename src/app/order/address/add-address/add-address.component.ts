import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  closeAddAddressSheet(): void {
    this._bottomSheet.dismiss();
  }

  ngOnInit(): void {
  }

}
