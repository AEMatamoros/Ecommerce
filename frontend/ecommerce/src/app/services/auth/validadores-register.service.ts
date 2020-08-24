import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { map } from 'rxjs/operators';
import { AccountService } from '../account/account.service';


@Injectable({
  providedIn: 'root'
})
export class ValidadoresRegisterService {

  constructor(
    private accounts: AccountService
  ) { }

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

  existeEmail(email: string){
    
    return(formGroup: FormGroup) =>{
      const emailControl = formGroup.controls[email];
      this.accounts.getAccounts().subscribe(
        accounts=>{
          accounts.forEach((element)=>{
            if(element.email == emailControl.value){
              return emailControl.setErrors({existeEmail: true})
            }else{
              return emailControl.setErrors(null)
            }
          })
        }
      )
    }
  }

}
