import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '../environments/environment';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { Router } from '@angular/router';
import { PerfilComponent } from "./tools/perfil/perfil.component";
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule, AuthenticatorComponent, NgIf, PerfilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RedSocial';
  auth: FirebaseTSAuth;
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userdocument: userDocument | undefined;





  constructor(private loginSheet: MatBottomSheet,
    private router:Router
  ) {
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
                 this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.getUserProfile();

            },
            whenChanged: user => {

            }
          }
        )
      });
  }
  getUserProfile(){
    this.firestore.listenToDocument(
      {
        name:"Getting Document",
        path: ["Users", this.auth.getAuth().currentUser?.uid ?? 'default-uid']
,
        onUpdate: (result) =>{
            this.userdocument = <userDocument>result.data();
          
          this.userHasProfile = result.exists;
 
        }

      }
    );
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

export interface userDocument{
  publicName: string;
  description: string;
}
