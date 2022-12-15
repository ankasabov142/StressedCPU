import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from '../../user.service';
import patterns from 'src/app/shared/util/patterns';
import { getError } from 'src/app/shared/util/functions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  private _hidePassword: Boolean = true;

  get hidePassword(): Boolean { return this._hidePassword; }
  get patterns() { return patterns; };

  constructor(private userService: UserService) { }

  togglePasswordVisibility() {
    this._hidePassword = !this._hidePassword;
  }

  getEmailError({ control }: NgModel): string {
    return getError(control.errors, 'Email')
  }
  getPasswordError({ control }: NgModel): string {
    return getError(control.errors, 'Password',
      { pattern: 'Must have 1 or more: capital letter, digit, symbol' });;
  }

  loginHandler(form: NgForm) {
    const { email, password } = form.value;
    this.userService.login({ email, password });
  }
}
