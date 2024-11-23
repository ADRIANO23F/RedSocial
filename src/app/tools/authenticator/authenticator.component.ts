import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-authenticator',
  imports: [NgIf],
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css'
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}