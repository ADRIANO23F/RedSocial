import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true, // Declarar como componente independiente
  imports: [CommonModule, NgIf], // Importar CommonModule para usar ngClass
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'], // Cambiar a styleUrls
})
export class PerfilComponent {
  @Input() show: boolean = true; // Inicializar directamente

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;
//
hasPerfil : boolean = false;


  constructor(private router: Router){
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth(); 
  }

  cerrarSesion() {
    this.show = false; // Esto cerrará el perfil
    this.auth.signOut()
    this.router.navigate([""])
  }
  onContinueCLICK(
    nameInput:HTMLInputElement,
    descriptionInput:HTMLTextAreaElement

  ){
    let name = nameInput.value;
    let description = descriptionInput.value;


    if(this.isNotEmpty(name) && this.isNotEmpty(description)){
      this.firestore.create(
        {
          path: ["Users", this.auth.getAuth().currentUser?.uid ?? 'default-uid'],
  
          data: {
            publicName: name,
            description: description
  
          },
          onComplete: (docId) =>{
            alert("Perfil Creado");
            this.hasPerfil = true;
            nameInput.value= "";
            descriptionInput.value="";
  
          },
          onFail: (err) => {
  
          }
        }
      );

    }else{
      alert("Completa todos los campos para continuar")
    }
    

  }
  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }
}

