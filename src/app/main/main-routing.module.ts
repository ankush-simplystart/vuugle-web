import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { VuugleResultsComponent } from './home/show-movies/vuugle-results/vuugle-results.component';
import { DiscoverComponent } from './discover/discover.component';
import { VideoDetailComponent } from './discover/video-detail/video-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailComponent } from './my-orders/order-detail/order-detail.component';




const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'vuugle-results', component: VuugleResultsComponent },
      { path: 'discover', component: DiscoverComponent },
      { path: 'video-detail', component: VideoDetailComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'order-detail', component: OrderDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
