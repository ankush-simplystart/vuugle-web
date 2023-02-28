import { Component,OnInit } from '@angular/core';
import { IUser, CognitoService } from '../../../services/cognito.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sign-up-option',
  templateUrl: './sign-up-option.component.html',
  styleUrls: ['./sign-up-option.component.scss']
})
export class SignUpOptionComponent {
  user: IUser;
  clientId: string;
  callBackUrl: string;
  coginitoAuthUrl: string;
  constructor(private cognitoService: CognitoService,) {
      this.clientId = environment.cognito.userPoolWebClientId;
      this.callBackUrl = environment.cognito.callBackUrl;
      this.coginitoAuthUrl = environment.cognito.coginitoAuthUrl;
  }

  ngOnInit(): void {
  }


  public googleSignIn() {
      this.cognitoService.federatedGoogleSignIn()
          .then((user: any) => {
              console.log("*****", user)
          }).catch((error) => {
              console.log("^^^^^^^", error.message)
          });
  }

  public facebookSignIn() {
      this.cognitoService.federatedFacebookSignIn()
          .then((user: any) => {
              console.log(user)
          }).catch((error) => {
              console.log(error.message)
          });
  }
}
