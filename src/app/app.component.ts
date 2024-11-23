import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FirebaseTSApp} from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '../environments/environment';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RedSocial';

  constructor(){
FirebaseTSApp.init(environment.firebaseConfig )

  }

}
