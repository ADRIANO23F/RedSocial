import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-publicacion',
  standalone: true, // Esto indica que es un componente standalone
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css'],
  imports: [MatIconModule] // Importa MatIconModule aquí
})
export class PublicacionComponent {}
