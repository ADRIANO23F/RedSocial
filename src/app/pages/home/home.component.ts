import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from '../../tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  auth : FirebaseTSAuth = new FirebaseTSAuth();

  constructor (private loginSheet: MatBottomSheet){

  }

  onGetStartedClick(){
this.loginSheet.open(AuthenticatorComponent)

  }

 
 
}
