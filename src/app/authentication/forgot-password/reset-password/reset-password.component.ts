import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { GenericValidatorComponent } from '../../../shared/generic-validator/generic-validator.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  @Output() changePassword: EventEmitter<any> = new EventEmitter<any>();
  @Input() maskEmail: "";
  @Input() userEmail: "";
  errorMessage:string;
  showProgressBar: boolean = false;
  forgotPasswordSubmitForm: any;

  constructor(
    private fb: FormBuilder,
    private genericValidator: GenericValidatorComponent,
  ) {}

  ngOnInit() {
    this.forgotPasswordSubmitForm = this.fb.group({
      password: ['', [Validators.required, this.genericValidator.passwordValidator,Validators.minLength(8),Validators.maxLength(32)]],
      confirm_password: ['', Validators.required],
    }, {
      validator: this.genericValidator.confirmPasswordValidator('password', 'confirm_password')
    });
  }

  submitResetPassword(): void{
    if (this.forgotPasswordSubmitForm.valid) {
      let password    = this.forgotPasswordSubmitForm.get('password')?.value ?? '';
      let data = {
        password: password,
        email: this.userEmail
      }
      this.changePassword.emit(data);
    }
  }

}
