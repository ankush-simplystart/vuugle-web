import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DiscoverComponent } from './discover/discover.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SplashComponent } from './splash/splash.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { ShowMoviesComponent } from './home/show-movies/show-movies.component';
import { MyVuuglesComponent } from './home/my-vuugles/my-vuugles.component';
import { RecommendationsComponent } from './home/recommendations/recommendations.component';
import { VuugleResultsComponent } from './home/show-movies/vuugle-results/vuugle-results.component';
import { VideoDetailComponent } from './discover/video-detail/video-detail.component';
import { OrderDetailComponent } from './my-orders/order-detail/order-detail.component';


@NgModule({
  declarations: [
    MainComponent,
    DiscoverComponent,
    HomeComponent,
    WishlistComponent,
    MyOrdersComponent,
    SplashComponent,
    MainFooterComponent,
    ShowMoviesComponent,
    MyVuuglesComponent,
    RecommendationsComponent,
    VuugleResultsComponent,
    VideoDetailComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
