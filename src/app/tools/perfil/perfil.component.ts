import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-perfil',
  standalone: true, // Declarar como componente independiente
  imports: [CommonModule], // Importar CommonModule para usar ngClass
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'], // Cambiar a styleUrls
})
export class PerfilComponent {
  @Input() show: boolean = true; // Inicializar directamente

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor(){
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  cerrarSesion() {
    this.show = false; // Esto cerrará el perfil
  }
  onContinueCLICK(
    nameInput:HTMLInputElement,
    descriptionInput:HTMLTextAreaElement

  ){
    let name = nameInput.value;
    let description = descriptionInput.value;
    this.firestore.create(
      {
        path: ["Users", this.auth.getAuth().currentUser?.uid ?? 'default-uid'],

        data: {
          publicName: name,
          description: description

        },
        onComplete: (docId) =>{
          alert("Perfil Creado");
          nameInput.value= "";
          descriptionInput.value="";

        },
        onFail: (err) => {

        }
      }
    );

  }
}
