import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser, CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  @Output() resetPasswordCode: EventEmitter<any> = new EventEmitter<any>();
  @Input() maskEmail: "";
  @Input() userEmail: "";
  @Input() errorMessage:string;
  showProgressBar: boolean = false;
  verificationCode: any;
  user: IUser;
  constructor(
    private cognitoService: CognitoService,
  ) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {}

  onOtpChange(evt){
    this.verificationCode = evt;
  }

  validateOtp(){
    this.resetPasswordCode.emit(this.verificationCode);
  }

  /**
   * Function to resent OTP
   */
  public resendConfirmationCode(): void{
    this.user.email      = this.userEmail;
    this.showProgressBar = true;
    this.cognitoService.resendConfirmationCode(this.user)
        .then(() => {
            this.showProgressBar = false;
        }).catch((error) => {
            this.errorMessage = error.message;
            this.showProgressBar = false;
        });
  }
}
