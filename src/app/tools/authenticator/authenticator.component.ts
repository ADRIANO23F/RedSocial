import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-authenticator',
  imports: [NgIf],
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css'
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor(private bottomSheetRef: MatBottomSheetRef) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }
onResetClick(resetemail: HTMLInputElement){
  let email = resetemail.value;
  if(this.isNotEmpty(email)){
    this.firebasetsAuth.sendPasswordResetEmail(
      {
        email: email,
        onComplete: (err) =>{
          alert("Utilice una cuenta de Gmail existente");
          this.bottomSheetRef.dismiss();
        }
        
      }
    );
  }

}

  onLoginClick(
    loginemail: HTMLInputElement,
    loginpassword: HTMLInputElement
  ) {
    let email = loginemail.value;
    let password = loginpassword.value;

    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password: password,
          onComplete:(uc) =>{
            this.bottomSheetRef.dismiss();
          },
          onFail:(err) =>{
            alert("Fallo al Iniciar sesion , Utilize Una cuenta Existente");
            alert(err);

          }
        }
      );
    }
  }

  onRegisterClick(
    registeremail: HTMLInputElement,
    registerpassword: HTMLInputElement,
    registerconfirmpassword: HTMLInputElement
  ) {
    let email = registeremail.value;
    let password = registerpassword.value;
    let confirmpassword = registerconfirmpassword.value;
    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmpassword) &&
      this.isAMatch(password, confirmpassword)
    ) {
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss();
          },
          onFail: (err) => {
            alert("Fallo al crear una cuenta,Utilize credenciales Correctos");

          }

        }
      );

    }

  }
  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }
  isAMatch(text: string, comparedWith: string) {
    return text == comparedWith;


  }
  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick1() {
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