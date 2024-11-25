import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-verification',
  imports: [],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
  auth = new FirebaseTSAuth();
constructor(private router: Router){}

OnInit():void{
  if(
    this.auth.isSignedIn() &&
    !this.auth.getAuth().currentUser?.emailVerified
  ){
    this.auth.sendVerificationEmail();
  }else{
    this.router.navigate([""]);
  }
}

onResendClick(){
this.auth.sendVerificationEmail();
}
}
