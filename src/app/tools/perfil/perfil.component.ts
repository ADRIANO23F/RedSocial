import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true, // Declarar como componente independiente
  imports: [CommonModule], // Importar CommonModule para usar ngClass
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'], // Cambiar a styleUrls
})
export class PerfilComponent {
  @Input() show: boolean = false; // Inicializar directamente
}

