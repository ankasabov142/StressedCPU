import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { getError } from 'src/app/shared/util/functions';
import patterns from 'src/app/shared/util/patterns';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  private _hidePassword: Boolean = true;
  private _hideRepassword: Boolean = true;

  get hidePassword(): Boolean { return this._hidePassword; }
  get hideRepassword(): Boolean { return this._hideRepassword; }
  get patterns() { return patterns };

  togglePasswordVisibility(): void {
    this._hidePassword = !this._hidePassword;
  }
  toggleRepasswordVisibility(): void {
    this._hideRepassword = !this._hideRepassword;
  }

  getFirstNameError({ control }: NgModel): string {
    return getError(control.errors, 'First name')
  }
  getLastNameError({ control }: NgModel): string {
    return getError(control.errors, 'Last name')
  }
  getEmailError({ control }: NgModel): string {
    return getError(control.errors, 'Email')
  }
  getPhoneNumberError({ control }: NgModel): string {
    return getError(control.errors, 'Phone number')
  }
  getPasswordError({ control }: NgModel): string {
    return getError(control.errors, 'Password',
      { pattern: 'Must have 1 or more: capital letter, digit, symbol' });;
  }

  registerHandler(form: NgForm): void {
    console.log(form.value);
  }
}
