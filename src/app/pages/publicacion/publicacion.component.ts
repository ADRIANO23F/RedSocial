import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreacionpublicacionComponent } from '../../tools/creacionpublicacion/creacionpublicacion.component';
import { PostComponent } from '../../tools/post/post.component'; // Asegúrate de usar la ruta correcta

@Component({
  selector: 'app-publicacion',
  standalone: true, // Esto indica que es un componente standalone
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css'],
  imports: [MatIconModule, PostComponent] // Incluye PostComponent aquí
})
export class PublicacionComponent {
  constructor(private dialog: MatDialog) {}

  onCreatePostClick() {
    this.dialog.open(CreacionpublicacionComponent);
  }
}
