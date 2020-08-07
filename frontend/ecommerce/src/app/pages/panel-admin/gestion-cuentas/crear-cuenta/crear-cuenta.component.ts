import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//rxjs
import { delay } from 'rxjs/operators';

//Modelos
import { Admin_Account } from 'src/app/models/account/crear_account';
import { Image } from 'src/app/models/general/general-models';

//Servicios
import { AccountService } from 'src/app/services/panelAdmin/account.service';
import { SubirArchivoService } from 'src/app/services/panelAdmin/subir-archivo.service';

//interfaz para imagen
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  
  public imgFile: File;
  public fotoSelected: string | ArrayBuffer;
  public imagenSubida: any;
  public formAccount: FormGroup;
  public account: Admin_Account;
  public imagen: Image[] = [];
  public edit: boolean = false;
  public roles: any = [
    {name: 'USER_NORMAL', value: 0},
    {name: 'ADMIN', value: 1}
  ];
  public status: string = '';
  public message: string = '';
  public messageCuenta: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private SubirArchivoService: SubirArchivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 

    this.crearFormulario();
  }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id})=> this.cargarCuenta(id));

    

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

  cargarCuenta(id:number){
    this.accountService.obtenerCuenta(id).pipe(delay(100))
        .subscribe(
          account => {
            if(!account){
              this.router.navigateByUrl('admin/cuentas');
            }
            console.log('account edit', account);
            const accountForm = {
              name: account['first_name'],
              apellido: account['last_name'],
              telefono: account['phone_number'],
              rolesUser: account['is_admin'] ? 'ADMIN':'USER_NORMAL',
              fecha_nac: account['birth_date'],
              correo: account['email']
            }
            this.formAccount.setValue(accountForm);
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
          this.status = 'success';
          this.message = 'Imagen subida con éxito!';
          //console.log('imagen subida ',resp);
        }, 
          error=> console.log(error)
        );
  }


  obtenerImagenes(){
    this.accountService.obtenerImagenes().subscribe((images: Image[])=>{
      this.imagen = images['results'][0];
      //console.log('imagen ',this.imagen);
    })
  }

  onCrearCuenta(){
    //console.log('formulario', this.formAccount);
    const params = this.activatedRoute.snapshot.params;
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

      let user_img;
      let cover_img;
      
      if(this.imagenSubida){
        user_img = this.imagenSubida['id'];
        cover_img = this.imagenSubida['id'];
      }else{
        user_img = this.imagen['id'];
        cover_img = this.imagen['id'];
      }
      
      this.account = new Admin_Account(0, direccion, email, name, lastname, phone, birth_date, password,
                                 is_admin, is_staff, is_superuser, user_img, cover_img);
      

      if(params.id){
        this.edit = true;
        let id = params.id;
        console.log('cuenta actualizar', this.account);
        this.account = new Admin_Account(id, direccion, email, name, lastname, phone, birth_date, password,
          is_admin, is_staff, is_superuser, user_img, cover_img);

        this.accountService.actualizarCuenta(this.account, id)
            .subscribe(resp => {
              this.status = 'success';
              this.message = 'Cuenta actualizada satisfactoriamente';
              console.log(resp);
            },
            error=>{
              this.messageCuenta = 'Cuenta no se pudo actualizar';
              console.log(error);
            });
      }else{
        this.edit = false;

        this.accountService.crearCuenta(this.account)
          .subscribe(resp => {
            this.messageCuenta = 'Cuenta creada satisfactoriamente';
            //console.log(this.message);
            //console.log(resp);
            this.router.navigateByUrl('admin/cuentas');
          }, error=>{
            
            this.messageCuenta = 'No se podido crear la cuenta';
            //console.log(this.messageCuenta);
            console.log(error);
          });

      }
      
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
