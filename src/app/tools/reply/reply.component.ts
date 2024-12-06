import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timestamp } from 'rxjs';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
@Component({
  selector: 'app-reply',
  standalone: true, // Asegúrate de que está definido como standalone
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  firestore = new FirebaseTSFirestore();
  constructor(@Inject(MAT_DIALOG_DATA) private postId: string){}
onSendClick(commentInput: HTMLInputElement){
  this.firestore.create(
    {
      path: ["Posts", this.postId, "PostComments"],
      data: {
        comment: commentInput.value,
        creatorId: "",
        creatorName:"",
        timestamp: FirebaseTSApp.getFirestoreTimestamp()

      }

    
    }
  );

}
}
