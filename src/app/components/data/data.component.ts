import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  form: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: 'javi',
      apellido: 'almansa'
    },
    email: 'a@b.com'
  };

  constructor() {

    this.form = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('',  Validators.required)
      }),   
      'email': new FormControl('',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    });

    this.form.setValue(this.usuario);
  }

  guardarCambios() {
    console.log(this.form.value);
    // this.form.reset();
    this.form.controls['email'].setValue('nuevocorreo@g.com');
  }


}
