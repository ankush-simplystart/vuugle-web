import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

import { SplashComponent } from './main/splash/splash.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  }
];

@NgModule({
  imports: [
     RouterModule.forRoot(routes,
        {
           preloadingStrategy: PreloadAllModules
        })
  ],
  exports: [
     RouterModule
  ],
  providers: [AuthService]
})
export class AppRoutingModule { }
