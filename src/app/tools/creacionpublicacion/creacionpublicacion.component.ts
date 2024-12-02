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


 async uploadImagenPost(comment: string) { 
  if(this.selectedImageFile != null){
    let postId = this.firestore.genDocId();
    const img = await this.uploadToDevmias(this.selectedImageFile);
   // console.log("UrlImg: " ,img)
   
      this.firestore.create(
        {
          path: ["Posts", postId],
          data: {
            comment: comment,
            
            creatorId: this.auth.getAuth().currentUser?.uid || 'default-uid',

            imageUrl: img,
            timestamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete: (docId) => {
            this.dialog.close();

          }

        }
      );

    
  }
   

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

  async uploadToDevmias(selectedImageFile: File): Promise<string | undefined> {
    let url: string | undefined;

    try {
      // Crear un FormData para enviar el archivo
      const formData = new FormData();
      formData.append('file', selectedImageFile);

      // URL del archivo PHP
      const serverUrl = 'https://devmiasx.com/upload.php'; // Cambia esto por la URL donde está tu archivo PHP

      // Realizar la solicitud POST
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      // Parsear la respuesta
      const responseData = await response.json();

      if (responseData.success) {
        url = "https://devmiasx.com/" + responseData.url;
      } else {
        throw new Error(responseData.message || 'Error desconocido al subir la imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }

    return url;
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
