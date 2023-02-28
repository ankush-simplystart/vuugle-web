import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSellersComponent } from './product-sellers.component';

describe('ProductSellersComponent', () => {
  let component: ProductSellersComponent;
  let fixture: ComponentFixture<ProductSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSellersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
