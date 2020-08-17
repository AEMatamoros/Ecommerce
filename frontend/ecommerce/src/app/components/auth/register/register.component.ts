import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/models/auth/user';
import { UserService } from 'src/app/services/auth/user.service';
import { ValidadoresRegisterService } from 'src/app/services/auth/validadores-register.service';

declare function customInitFunctions();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;
  public user: User; 
  public registerUser: string;
  public status: string; 
  public message: string;

  constructor(private fb:FormBuilder,
              private validador: ValidadoresRegisterService,
              private userService:UserService,
              private router: Router) {
    
    this.crearFormulario();
  }

  ngOnInit(): void {
    customInitFunctions();
  }
  
  get nombreNoValido() {
    return this.formRegister.get('nombre').invalid && this.formRegister.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.formRegister.get('apellido').invalid && this.formRegister.get('apellido').touched
  }

  get correoNoValido() {
    return this.formRegister.get('email').invalid && this.formRegister.get('email').touched
  }

  get telefonoNoValido() {
    return this.formRegister.get('phone_number').invalid && this.formRegister.get('phone_number').touched
  }

  get fechaNoValida() {
    return this.formRegister.get('birth_date').invalid && this.formRegister.get('birth_date').touched
  }

  get pass1NoValido() {
    return this.formRegister.get('password').invalid && this.formRegister.get('password').touched;
  }

  get pass2NoValido() {
    const pass1 = this.formRegister.get('password').value;
    const pass2 = this.formRegister.get('confirm_password').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  crearFormulario(){
    this.formRegister = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)] ],
      apellido: ['',[Validators.required, Validators.minLength(4)] ],
      phone_number: ['', [Validators.required, Validators.minLength(8)]],
      birth_date: ['', [Validators.required] ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },{
      validators: this.validador.passwordsIguales('password','confirm_password')
    });
  }

  onRegister(){
   
    if ( this.formRegister.invalid ) {

      return Object.values( this.formRegister.controls ).forEach( control => { control.markAsTouched(); });
     
    }else{
      
      let name = this.formRegister.controls.nombre.value;
      let lastname = this.formRegister.controls.apellido.value;
      let phone = this.formRegister.controls.phone_number.value;
      let birth_date = this.formRegister.controls.birth_date.value; 
      let email = this.formRegister.controls.email.value;
      let password = this.formRegister.controls.password.value;
      let confirm_password = this.formRegister.controls.confirm_password.value;

      this.user = new User(0,name,lastname,email,phone, birth_date, password, confirm_password);
      
      this.userService.RegisterUser(this.user)
                      .subscribe(
                        response =>{
                          //console.log(response);
                          if(response.token){
                            this.status = 'success';
                            this.message = response.response;
                            this.formRegister.reset();
                            this.router.navigateByUrl('/login');
                          }
                        },
                        error =>{
                          console.log(<any>error);
                        }
                      );
    }

  }

}
