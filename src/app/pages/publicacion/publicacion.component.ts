import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreacionpublicacionComponent } from '../../tools/creacionpublicacion/creacionpublicacion.component';
import { PostComponent } from '../../tools/post/post.component'; // Verifica la ruta correcta
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CommonModule } from '@angular/common'; // Importar CommonModule para directivas como *ngFor

@Component({
  selector: 'app-publicacion',
  standalone: true,
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css'],
  imports: [CommonModule, MatIconModule, PostComponent] // Asegúrate de incluir CommonModule
})
export class PublicacionComponent {
  firestore = new FirebaseTSFirestore(); // Instancia del servicio Firestore
  posts: PostData[] = []; // Usa PascalCase para la interfaz

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPosts();
  }

  // Método para abrir el diálogo de creación de publicación
  onCreatePostClick() {
    this.dialog.open(CreacionpublicacionComponent);
  }

  // Método para obtener publicaciones de Firestore
  getPosts() {
    this.firestore.getCollection({
      path: ['Posts'],
      where: [
        new OrderBy('timestamp', 'desc'), // Ordena por timestamp en orden descendente
        new Limit(10) // Límite de 10 documentos
      ],
      onComplete: (result) => {
        result.docs.forEach((doc) => {
          const post = <PostData>doc.data();
          post.postId = doc.id;
          this.posts.push(post); // Agrega la publicación al array
         // console.log("post: ", this.posts)
        });
      },
      onFail: (err) => {
        console.error('Error al obtener las publicaciones:', err); // Manejador de errores
      }
    });
  }
}

// Interfaz para definir el tipo de datos de las publicaciones
export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?:  string;
  postId: string;
}
