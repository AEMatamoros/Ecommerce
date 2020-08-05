import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//Modelos
import { Account } from 'src/app/models/account/account';
import { Image } from 'src/app/models/general/general-models';

//Servicios
import { AccountService } from 'src/app/services/panelAdmin/account.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  public formAccount: FormGroup;
  public account: Account;
  public imagen: Image[] = [];
  public roles: any = [
    {name: 'USER_NORMAL', value: 0},
    {name: 'ADMIN', value: 1}
  ];
  public status: string = '';
  public message: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { 

    this.crearFormulario();
  }

  ngOnInit(): void {
    
    this.obtenerImagenes();
  }

  crearFormulario(){
    this.formAccount = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)] ],
      apellido: ['',[Validators.required, Validators.minLength(4)] ],
      telefono: ['', [Validators.required, Validators.minLength(8)]],
      rolesUser: new FormControl('', [Validators.required]),
      fecha_nac: ['', [Validators.required] ],
      correo: ['', [Validators.required, Validators.email] ]
    });
  }

  obtenerImagenes(){
    this.accountService.obtenerImagenes().subscribe((images: Image[])=>{
      this.imagen = images['results'][0];
    })
  }

  onCrearCuenta(){
    console.log(this.formAccount);

    if(this.formAccount.invalid){
      return Object.values( this.formAccount.controls ).forEach( control => { control.markAsTouched(); });
    }else{
      let direccion = null;
      let email = this.formAccount.controls.correo.value;
      let name = this.formAccount.controls.name.value;
      let lastname = this.formAccount.controls.apellido.value;
      let phone = this.formAccount.controls.telefono.value;
      let birth_date = this.formAccount.controls.fecha_nac.value; 
      let password = 'user_default'; /*todos tendran la misma al inicio*/
      let rol = this.formAccount.value.rolesUser;
      //console.log('rol: ', rol);
      let is_superuser:boolean;
      let is_admin:boolean;
      let is_staff: boolean;
      if(rol == 0){
        is_superuser = true;
        is_admin = false;
        is_staff = false;
      }
      if(rol == 1){
        is_superuser = false;
        is_admin = true;
        is_staff = false;
      }
      
      let user_img = this.imagen['img_route'];
      let cover_img = this.imagen['img_route'];

      this.account = new Account(0, direccion, email, name, lastname, phone, birth_date, password,
                                 is_admin, is_staff, is_superuser, user_img, cover_img);

      
    }

  }

  //Validaciones
  get nombreNoValido() {
    return this.formAccount.get('name').invalid && this.formAccount.get('name').touched
  }

  get apellidoNoValido() {
    return this.formAccount.get('apellido').invalid && this.formAccount.get('apellido').touched
  }
  
  get correoNoValido() {
    return this.formAccount.get('correo').invalid && this.formAccount.get('correo').touched
  }

  get telefonoNoValido() {
    return this.formAccount.get('telefono').invalid && this.formAccount.get('telefono').touched
  }

  get fechaNoValida() {
    return this.formAccount.get('fecha_nac').invalid && this.formAccount.get('fecha_nac').touched
  }

}
