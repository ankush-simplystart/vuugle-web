import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-address-listing',
  templateUrl: './address-listing.component.html',
  styleUrls: ['./address-listing.component.css']
})
export class AddressListingComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  openAddAddressSheet(): void {
    this._bottomSheet.open(AddAddressComponent,{
      panelClass: 'add-address-bottomsheet'
    });
  }

  closeMyAddressSheet(): void {
    this._bottomSheet.dismiss();
  }

  ngOnInit(): void {
  }

}
