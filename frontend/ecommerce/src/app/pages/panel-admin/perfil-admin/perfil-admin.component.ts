import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { delay } from 'rxjs/operators';

import { Direccion } from 'src/app/interfaces/direccion';

import { Account } from 'src/app/models/account/account';
import { Admin_Account } from 'src/app/models/account/crear_account';

import { AccountService } from 'src/app/services/panelAdmin/account.service';
import { SubirArchivoService } from 'src/app/services/panelAdmin/subir-archivo.service';

//interfaz para imagen
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html'
})
export class PerfilAdminComponent implements OnInit {
  public status: string;
  public message: string;
  public formPerfil: FormGroup;
  public id: number;
  public Admin_edit: Account[];
  public account: Admin_Account;
  public direccion: Direccion; 
  public direction_id: number;

  public roles: any = [
    {name: 'USER_NORMAL', value: 0},
    {name: 'ADMIN', value: 1}
  ];

  public imgFile: File;
  public fotoSelected: string | ArrayBuffer;
  public imagenSubida: any;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private SubirArchivoService: SubirArchivoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.id = parseInt(localStorage.getItem('id'));
    this.crearFormulario();
    //console.log('id', this.id);
  }

  ngOnInit(): void {
    this.cargarAdminUser(this.id);
  }

  crearFormulario(){
    this.formPerfil = this.formBuilder.group({
      nameAdmin: ['', [Validators.required, Validators.minLength(3)] ],
      apellidoAdmin: ['',[Validators.required, Validators.minLength(4)] ],
      telefonoAdmin: ['', [Validators.required, Validators.minLength(8)]],
      direccionAdmin: ['', Validators.required],
      rolesUserAdmin: new FormControl('', [Validators.required]),
      fecha_nacAdmin: ['', [Validators.required] ],
      correoAdmin: ['', [Validators.required, Validators.email] ]
    });
  }

  cargarAdminUser(id:number){
    this.accountService.obtenerCuenta(id).pipe(delay(100))
        .subscribe(
          account => {
            if(!account){
              this.router.navigateByUrl('admin/perfil-admin');
            }
            this.Admin_edit = account;
            //console.log('carga ', account);
            const adminForm = {
              nameAdmin: account['first_name'],
              apellidoAdmin: account['last_name'],
              telefonoAdmin: account['phone_number'],
              direccionAdmin: account['direction'] ? account['direction']['direction']: '',
              rolesUserAdmin: account['is_admin'] ? 'ADMIN':'USER_NORMAL',
              fecha_nacAdmin: account['birth_date'],
              correoAdmin: account['email']
            }
            this.formPerfil.setValue(adminForm);
          }
        )
  }

  fotoSeleccionada(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.imgFile = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.fotoSelected = reader.result;
      reader.readAsDataURL(this.imgFile);

    }
  }

  subirFoto(){
    this.SubirArchivoService.subirFoto(this.imgFile)
        .subscribe(resp => {
          this.imagenSubida = resp;
          //console.log(this.imagenSubida);
          this.status = 'success';
          this.message = 'Imagen subida con éxito!';
          //console.log('imagen subida ',resp);
        }, 
          error=> console.log(error)
        );
  }

  onFormPerfil(){
    if(this.formPerfil.invalid){
      return Object.values( this.formPerfil.controls ).forEach( control => { control.markAsTouched(); });
    }else{
      let id = this.id;

      let email = this.formPerfil.value.correoAdmin;
      let name = this.formPerfil.value.nameAdmin;
      let lastname = this.formPerfil.value.apellidoAdmin;
      let phone = this.formPerfil.value.telefonoAdmin;
      let strDireccion = this.formPerfil.value.direccionAdmin;
      let direccion = new Direccion(0, strDireccion);
      let birth_date = this.formPerfil.value.fecha_nacAdmin;

      let rol = this.formPerfil.value.rolesUserAdmin;
      let is_superuser:boolean;
      let is_admin:boolean;
      let is_staff: boolean;

      let user_img;
      let cover_img;

      if(rol == 0){
        is_superuser = true;
        is_admin = false;
        is_staff = false;
      }
      if(rol == 1){
        is_superuser = true;
        is_admin = true;
        is_staff = true;
      }

      if(this.imagenSubida){
        //console.log('form ',this.imagenSubida);
        user_img = this.imagenSubida['id'];
        cover_img = this.imagenSubida['id'];
      }else{
        user_img = this.Admin_edit['id'];
        cover_img = this.Admin_edit['id'];
      }

      let password = this.Admin_edit['password'];
      
      //console.log('direccion actualizar', direccion);
      
      this.accountService.crearDireccion(direccion).subscribe(
        resp=>{
          this.direction_id = resp['id'];
          this.account = new Admin_Account(id, this.direction_id, email, name, lastname, phone, birth_date, password,
            is_admin, is_staff, is_superuser, user_img, cover_img);

            this.accountService.actualizarCuenta(this.account, id)
          .subscribe(resp => {
            this.status = 'success';
            this.message = 'Cuenta actualizada satisfactoriamente';
            this.ngOnInit();
            this.router.navigateByUrl('admin/perfil-admin');
            //console.log(resp);
          },
          error=>{
            this.message = 'Cuenta no se pudo actualizar';
            console.log(error);
          });

        }
      )
    }
  }

  //Validaciones
  get nombreNoValidoAdmin() {
    return this.formPerfil.get('nameAdmin').invalid && this.formPerfil.get('nameAdmin').touched
  }

  get apellidoNoValidoAdmin() {
    return this.formPerfil.get('apellidoAdmin').invalid && this.formPerfil.get('apellidoAdmin').touched
  }
  
  get correoNoValidoAdmin() {
    return this.formPerfil.get('correoAdmin').invalid && this.formPerfil.get('correoAdmin').touched
  }

  get telefonoNoValidoAdmin() {
    return this.formPerfil.get('telefonoAdmin').invalid && this.formPerfil.get('telefonoAdmin').touched
  }

  get fechaNoValidaAdmin() {
    return this.formPerfil.get('fecha_nacAdmin').invalid && this.formPerfil.get('fecha_nacAdmin').touched
  }

  get direccionNoValidaAdmin(){
    return this.formPerfil.get('direccionAdmin').invalid && this.formPerfil.get('direccionAdmin').touched
  }

}
