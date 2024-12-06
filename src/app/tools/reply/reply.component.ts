import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],  // Asegúrate de incluir CommonModule
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  firestore = new FirebaseTSFirestore();
  comments: comment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private postId: string) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.firestore.listenToCollection(
      {
        name: 'Post Comments',
        path: ['Posts', this.postId, 'PostComments'],
        where: [new OrderBy('timestamp', 'asc')],
        onUpdate: (result) => {
          result.docChanges().forEach((postCommentDoc) => {
            if (postCommentDoc.type === 'added') {
              this.comments.unshift(<comment>postCommentDoc.doc.data());
            }
          });
        },
      }
    );
  }

  onSendClick(commentInput: HTMLInputElement) {
    if (!(commentInput.value.length > 0)) return;
    this.firestore.create({
      path: ['Posts', this.postId, 'PostComments'],
      data: {
        comment: commentInput.value,
        creatorId: AppComponent.getUserDocument()?.userId,
        creatorName: AppComponent.getUserDocument()?.publicName,
        timestamp: FirebaseTSApp.getFirestoreTimestamp(),
      },
      onComplete: (docId) => {
        commentInput.value = '';
      },
    });
  }
}

export interface comment {
  creatorId: string;
  creatorName: string;
  comment: string;
  timestamp: firebase.default.firestore.Timestamp;
}
