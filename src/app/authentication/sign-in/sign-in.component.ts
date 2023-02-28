import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  isLoading: boolean = false;
  user: IUser;
  loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
  });

hide = true;

constructor(
      private router: Router,
      private fb: FormBuilder,
      private cognitoService: CognitoService
) {
    this.isLoading = false;
    this.user = {} as IUser;
}

  ngOnInit(): void {


}
  submitLoginForm() {
      if (this.loginForm.valid) {
          this.user.email = this.loginForm.get('email')?.value ?? '';
          this.user.password = this.loginForm.get('password')?.value ?? '';
          this.isLoading = true;
          this.cognitoService.signIn(this.user)
              .then(() => {
                  this.isLoading = false;
                  this.router.navigate(['/main/discover']);
              }).catch((err) => {
                  alert(err.message || JSON.stringify(err));
                  this.isLoading = false;
              });
          }
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
