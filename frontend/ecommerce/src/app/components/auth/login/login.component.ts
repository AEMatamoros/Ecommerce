import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthLogin } from 'src/app/models/auth/auth-login';
import { UserService } from 'src/app/services/auth/user.service';

declare function initPlugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginAuth: AuthLogin;
  public message: string;
  public status: string;

  constructor(private userService: UserService,
              private router: Router) {
    this.loginAuth = new AuthLogin(0,'','','');
   }

  ngOnInit(): void {
    initPlugins();
  }

  login(form: NgForm){
    /*console.log(form);*/
    if (form.invalid){
      return;
    }else{
      
      this.userService.loginUser(this.loginAuth)
          .subscribe(response=>{
            this.status = response['response'];
            this.message = response['error_message'];
            console.log(response);
            if(response['token']){
              /*
                Despues tiene que rediriguir a home 
                this.router.navigateByUrl('/home');
              */
              form.reset();
              console.log(response['token']);
              this.router.navigateByUrl('/perfil');
            }
          },
          error =>{
            console.log(error);
          });

    }
  }

}
