import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

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
    email: 'a@b.com',
    pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {

    this.form = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [
                                          Validators.required,
                                          this.noHerrera
                                        ])
      }),
      'email': new FormControl('',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
      });

    // this.form.setValue(this.usuario);
    this.form.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.form)
    ]);

    this.form.controls['username'].valueChanges.subscribe(data => {
      console.log(data);
    });

    this.form.controls['username'].statusChanges.subscribe(data => {
      console.log(data);
    });
    this.form.statusChanges.subscribe(data => {
      console.log(data);
    });
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise (
          (success, error) => {
            setTimeout(() => {
                  if (control.value === 'strider') {
                    success({existe: true});
                  
                  } else {
                    success(null);
                  }
              }, 3000);
            }
          );
    return promesa;
  }

  agregarPasatiempo() {
    (<FormArray>this.form.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noHerrera( control: FormControl): {[s: string]: boolean} {
    if (control.value === 'herrera') {
      return {
        noherrera: true
      };
    }
    return null;
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    
    const form: any = this;
    
    if (control.value !== form.controls['password1'].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  guardarCambios() {
    // console.log(this.form.value);
    console.log(this.form);
    
    // this.form.reset();
    // this.form.controls['email'].setValue('nuevocorreo@g.com');
  }



}
