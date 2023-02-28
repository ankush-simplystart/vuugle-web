import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSellersComponent } from './product-sellers/product-sellers.component';
import { SellerDetailComponent } from './product-sellers/seller-detail/seller-detail.component';


@NgModule({
  exports: [
    SharedModule
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductSellersComponent,
    SellerDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
