import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '../environments/environment';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule, AuthenticatorComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RedSocial';
  auth: FirebaseTSAuth;



  constructor(private loginSheet: MatBottomSheet) {
    FirebaseTSApp.init(environment.firebaseConfig);
    this.auth = new FirebaseTSAuth();

    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {

            },
            whenSignedOut: user => {

            },
            whenSignedInAndEmailNotVerified: user => {

            },
            whenSignedInAndEmailVerified: user => {

            },
            whenChanged: user => {

            }
          }
        )
      });
  }

  loggedIn() {
    return this.auth.isSignedIn();
  }

  onLogoutClick(){
    this.auth.signOut();
  }

  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent)
  }


}
