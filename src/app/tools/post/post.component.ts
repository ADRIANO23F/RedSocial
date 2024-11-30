import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; // Módulos necesarios para mat-card
import { MatIconModule } from '@angular/material/icon'; // Módulo necesario para mat-icon

@Component({
  selector: 'app-post', // Ajusta el selector según tu uso
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [MatCardModule, MatIconModule], // Agrega los módulos necesarios aquí
})
export class PostComponent {}
