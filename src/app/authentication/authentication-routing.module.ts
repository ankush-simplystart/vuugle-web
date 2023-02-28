import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { SignInOptionComponent } from './sign-in-option/sign-in-option.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpOptionComponent } from './customer/sign-up-option/sign-up-option.component';
import { CustomerSignupComponent } from './customer/sign-up/sign-up.component';
import { ContentCreatorSingUpComponent } from './content-creator/sing-up/sing-up.component';
import { ContentCreatorProfileComponent } from './content-creator/content-creator-profile/content-creator-profile.component';
import { MerchantSignUpComponent } from './merchant/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@aws-amplify/ui-angular';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: '', component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'sign-in-option', pathMatch: 'full' },
      { path: 'sign-in-option', component: SignInOptionComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up-option', component: SignUpOptionComponent },
      { path: 'customer-sign-up', component: CustomerSignupComponent },
      { path: 'content-creator-sign-up', component: ContentCreatorSingUpComponent },
      { path: 'content-creator-profile', component: ContentCreatorProfileComponent },
      { path: 'merchant-sign-up', component: MerchantSignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'logout', component: LogoutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
