import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  enableChangePassword: boolean = false;
  errorMessage: string;
  maskEmail:string="";
  email:string="";
  isConfirm: boolean;
  user: IUser;
  forgotPasswordForm: any;
  showProgressBar: boolean = false;
  verificationCode: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cognitoService: CognitoService,
  ) {
    this.isConfirm = false;
    this.showProgressBar = false;
  }

  ngOnInit(): void {
    this.errorMessage = "";
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Function to get reset password code
   * @param evt
   */
  getResetPasswordCode(evt){
    if(evt) {
      this.verificationCode = evt;
      this.enableChangePassword = true;
    }
  }

  /**
   * Function to send reset password OTP
   */
  resetPassword(){
    if (this.forgotPasswordForm.valid) {
      this.showProgressBar = true;
      this.email = this.forgotPasswordForm.get('email')?.value ?? '';
      this.cognitoService.forgotPassword(this.email)
          .then((res) => {
            if(res && res.CodeDeliveryDetails && res.CodeDeliveryDetails.Destination) {
              this.maskEmail = res.CodeDeliveryDetails.Destination;
            } else {
              if (this.email) {
                  let splitEmail = this.email.split('@');
                  var last2char = splitEmail[0].slice(-2);
                  this.maskEmail = "*****" + last2char + "@" + splitEmail[1];
              }
            }
              this.errorMessage = "";
              this.showProgressBar = false;
              this.isConfirm = true;
          }).catch((error) => {
            this.showProgressBar = false;
            this.errorMessage = error.message;
          });
    }
  }

  /**
   * Function to reset password
   * @param obj
   */
  submitResetPassword(obj){
    if (obj.password) {
      let username    = obj.email;
      let code        = this.verificationCode;
      let new_password = obj.password;
      this.cognitoService.forgotPasswordSubmit(username, code, new_password)
          .then(() => {
              this.errorMessage = "";
              this.isConfirm = true;
              this.router.navigate(['/authentication/sign-in']);
          }).catch((error) => {
            this.enableChangePassword = false;
            this.isConfirm = true;
            this.errorMessage = error.message;
          });
    }
  }
}
