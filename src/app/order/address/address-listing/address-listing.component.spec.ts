import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressListingComponent } from './address-listing.component';

describe('AddressListingComponent', () => {
  let component: AddressListingComponent;
  let fixture: ComponentFixture<AddressListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
