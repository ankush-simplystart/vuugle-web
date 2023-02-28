import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  error_message: string = "";
  isLoading: boolean = false;
  user: IUser;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cognitoService: CognitoService,
  ) {
    this.user = {} as IUser;
  }

  ngOnInit() {
    this.logOut();
  }

  async logOut(){
    await this.cognitoService.signOut();
    this.router.navigate(['/authentication']);
  }
  
}
