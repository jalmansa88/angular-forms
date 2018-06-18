import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {
    border: 1px solid red}`]
})
export class TemplateComponent {

  usuario = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: '',
    acepta: false
  };

  sexos = ['Hombre', 'Mujer'];

  paises = [{
        codigo: 'ES',
        nombre: 'España'
      },
      {
        codigo: 'CRI',
        nombre: 'Costa Rica'
      }];

  constructor() { }

  guardar(forma: NgForm) {
    console.log('form completo: ', forma);
    console.log('valor del Form', forma.value);
    console.log('user', this.usuario);
  }

}
