import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [MatCardModule, MatIconModule],
})
export class PostComponent {
  @Input() postData?: { comment: string, creatorId :string, imageUrl ?: string}; // Marcado como opcional
 

  creatorName: string = "";
  creatorDescription: string  ="";
  firestore = new FirebaseTSFirestore();
  constructor() {}

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  getCreatorInfo() {
    if(this.postData != null){
      this.firestore.getDocument({
        path: ['Users', this.postData.creatorId],
        onComplete: result => {
          let userDocument = result.data();
          if(userDocument != null){
            this.creatorName = userDocument['publicName']; //.publicName;
            this.creatorDescription = userDocument['description']  //.description;
            //console.log("data: ",this.postData)
          }
          
        }
      });
    }
   
  }
}
