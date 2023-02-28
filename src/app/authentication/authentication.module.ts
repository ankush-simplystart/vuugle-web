import { Component, OnInit, Input,  ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SignInOptionComponent } from './sign-in-option/sign-in-option.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpOptionComponent } from './customer/sign-up-option/sign-up-option.component';
import { CustomerSignupComponent } from './customer/sign-up/sign-up.component';
import { ContentCreatorSingUpComponent } from './content-creator/sing-up/sing-up.component';
import { ContentCreatorProfileComponent } from './content-creator/content-creator-profile/content-creator-profile.component';
import { MerchantSignUpComponent } from './merchant/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    SignInOptionComponent,
    SignInComponent,
    SignUpOptionComponent,
    CustomerSignupComponent,
    ContentCreatorSingUpComponent,
    ContentCreatorProfileComponent,
    MerchantSignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
    OtpVerificationComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    RouterModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
