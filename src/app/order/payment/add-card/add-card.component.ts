import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  closeAddCardSheet(): void {
    this._bottomSheet.dismiss();
  }

  ngOnInit(): void {
  }

}
