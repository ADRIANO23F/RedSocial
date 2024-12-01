import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { timestamp } from 'rxjs';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-creacionpublicacion',
  standalone: true, // Asegúrate de que el componente es standalone
  templateUrl: './creacionpublicacion.component.html',
  styleUrls: ['./creacionpublicacion.component.css'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule] // Agrega CommonModule aquí
})
export class CreacionpublicacionComponent {

  // Inicializamos la propiedad como null para evitar el error de no inicialización
  selectedImageFile: File | null = null;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor(private dialog: MatDialogRef<CreacionpublicacionComponent>) { }

  // Método que se llama cuando se selecciona una foto
  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    if(comment.length <= 0) return;
    if(this.selectedImageFile){
      this.uploadImagenPost(comment);
    } else{
      this.uploadPost(comment);
    }

  }


  uploadImagenPost(comment: string) {
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create(
            {
              path: ["Posts", postId],
              data: {
                comment: comment,
                creatorId: this.auth.getAuth().currentUser?.uid || 'default-uid',

                imageUrl: downloadUrl,
                timestamp: FirebaseTSApp.getFirestoreTimestamp()
              },
              onComplete: (docId) => {
                this.dialog.close();

              }

            }
          );

        }

      }
    );

  }
  uploadPost(comment: string){
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: comment,
          creatorId: this.auth.getAuth().currentUser?.uid || 'default-uid',
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.dialog.close();

        }

      }
    );
  }




  onPhotoSelected(photoSelector: HTMLInputElement): void {
    // Verificamos si photoSelector.files no es null
    if (!photoSelector.files || photoSelector.files.length === 0) {
      return; // Si no hay archivos seleccionados, salimos del método
    }

    this.selectedImageFile = photoSelector.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);

    fileReader.addEventListener("loadend", () => {
      const readableString = fileReader.result as string;
      const postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
      if (postPreviewImage) {
        postPreviewImage.src = readableString;
      }
    });
  }
}
