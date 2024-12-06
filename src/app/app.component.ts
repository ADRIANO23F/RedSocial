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
  private static userdocument: userDocument | null | undefined = undefined;


  constructor(private loginSheet: MatBottomSheet,
    private router: Router
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
              AppComponent.userdocument = null;

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
  public static getUserDocument(){
    return AppComponent.userdocument;

  }
  get getUsername() {
    return AppComponent.userdocument ? AppComponent.userdocument : null;
  }
  
  getUserProfile() {
    let id = this.auth.getAuth().currentUser?.uid;
    if( id != null){
      this.firestore.listenToDocument(
        {
          name: "Getting Document",
          path: ["Users", id]
          ,
          onUpdate: (result) => {
            AppComponent.userdocument = <userDocument>result.data();
            this.userHasProfile = result.exists;
            AppComponent.userdocument.userId = this.auth.getAuth().currentUser?.uid || ''; // Evitar undefined
            console.log(this.userHasProfile)
            if (this.userHasProfile) {
              console.log("Si tiene perfil cargar post")
              this.router.navigate(["publicacion"]);
            }
  
          }
  
        }
      );
    }
    
  }

  loggedIn() {
    return this.auth.isSignedIn();
    
  }

  onLogoutClick() {
    this.auth.signOut();
    this.router.navigate([""])
    
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent)
  }


}

export interface userDocument {
  publicName: string;
  description: string;
  userId: string;
}
