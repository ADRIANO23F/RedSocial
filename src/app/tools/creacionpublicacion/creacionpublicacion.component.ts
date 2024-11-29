import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creacionpublicacion',
  standalone: true, // Asegúrate de que el componente es standalone
  templateUrl: './creacionpublicacion.component.html',
  styleUrls: ['./creacionpublicacion.component.css'],
  imports: [MatCardModule, MatIconModule, MatButtonModule] // Importa los módulos necesarios
})
export class CreacionpublicacionComponent {}
