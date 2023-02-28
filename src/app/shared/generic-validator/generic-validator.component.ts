import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-validator',
  templateUrl: './generic-validator.component.html',
  styleUrls: ['./generic-validator.component.css']
})
export class GenericValidatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Name validator if contain any special character.
   * @param control
   * @returns invalidName true if name contain any special charachter.
   */
   nameValidator(control: FormControl): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
       return { invalidName: true };
    }
  }
  /**
   * Password validator
   * @returns invalidPassword true if password not has number, uppercase, lowercase & special character.
   */
   passwordValidator(control: FormControl): { [key: string]: boolean } {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
        return { invalidPassword: true };
    }
    return null;
  }
  /**
   * Confirm Password Match validator
   * @returns confirmedValidator true if Confirm password and Password not match.
   */
  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }

}
