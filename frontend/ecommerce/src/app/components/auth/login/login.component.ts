import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthLogin } from 'src/app/models/auth/auth-login';
import { UserService } from 'src/app/services/auth/user.service';
import { ValidadoresRegisterService } from 'src/app/services/auth/validadores-register.service';

declare function customInitFunctions();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public loginAuth: AuthLogin;
  public message: string;
  public status: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private validador: ValidadoresRegisterService,
    private router: Router
  )
  {
    
    this.crearFormulario();
  }


  ngOnInit(): void {
    customInitFunctions();
  }

  get correoNoValido() {
    return this.formLogin.get('username').invalid && this.formLogin.get('username').touched
  }

  get passwordNoValida(){
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched
  }

  get existeEmail(){
    return this.formLogin.get('password').getError
  }

  crearFormulario(){
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    /*console.log(form);*/
    if (this.formLogin.invalid){
      return Object.values( this.formLogin.controls ).forEach( control => { control.markAsTouched(); });
    }else{
      let email = this.formLogin.controls.username.value;
      let password = this.formLogin.controls.password.value;
      this.loginAuth = new AuthLogin(0,email,password,'');
      this.userService.loginUser(this.loginAuth)
          .subscribe(response=>{
            this.status = response['response'];
            this.message = response['error_message'];
            //console.log('response ', response);
            if(response['token']){
              
              this.formLogin.reset();
              //console.log(response['token']);
              //console.log(response['user_admin'])
              if(response['user_admin']){
                this.router.navigateByUrl('/admin/datos');
              }else{
                this.router.navigateByUrl('/landing');
              }
              
            }
          },
          error =>{
            console.log(error);
          });

    }
  }

}
