import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidadoresRegisterService {

  constructor() { }


  passwordsIguales( password: string, confirm_password: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[password];
      const pass2Control = formGroup.controls[confirm_password];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    }

  }
}
