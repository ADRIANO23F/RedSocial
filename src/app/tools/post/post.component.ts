import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [MatCardModule, MatIconModule],
})
export class PostComponent {
  @Input() postData?: { 
    comment: string, 
    creatorId: string, 
    postId: string, // Agregado postId 
    imageUrl?: string 
  }; 

  creatorName: string = "";
  creatorDescription: string = "";
  firestore = new FirebaseTSFirestore();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  onReplyClick() {
    if (this.postData?.postId) {
      this.dialog.open(ReplyComponent, { data: this.postData.postId });
    } else {
      console.error('Post data or postId is undefined');
    }
  }

  getCreatorInfo() {
    if (this.postData) {
      this.firestore.getDocument({
        path: ['Users', this.postData.creatorId],
        onComplete: result => {
          let userDocument = result.data();
          if (userDocument) {
            this.creatorName = userDocument['publicName'];
            this.creatorDescription = userDocument['description'];
          }
        }
      });
    }
  }
}
