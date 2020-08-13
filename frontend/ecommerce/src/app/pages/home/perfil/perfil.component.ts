import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account/account';
import { AccountService } from 'src/app/services/account/account.service'
import {SubirArchivoService} from 'src/app/services/panelAdmin/subir-archivo.service'
import { Router } from '@angular/router';

//interfaz para imagen
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  constructor(private dataService:AccountService,private uploadService:SubirArchivoService,public router:Router) { }

  @Input() accountDetail =  {first_name:'', last_name:'', email:'', phone_number:'',id:localStorage.getItem('id'),birth_date:'',password:''}
  cuentas:Account[]
  cuenta_id=localStorage.getItem('id')
  
  public imgFile: File;
  public imagenSubida: any;
  public status: string = '';
  public message: string = '';
  public fotoSelected: string | ArrayBuffer;
  
  
  ngOnInit(){
     this.dataService.getAccounts()
      .subscribe(data =>this.cuentas=data)
      
    
  }
  //Seleccionar Foto
  fotoSeleccionada(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.imgFile = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.fotoSelected = reader.result;
      reader.readAsDataURL(this.imgFile);

    }
  }

  //FIN
  update(){
    //Subir imagenes
    this.uploadService.subirFoto(this.imgFile)
        .subscribe(resp => {
          this.imagenSubida = resp;
          this.status = 'success';
          this.message = 'Imagen subida con éxito!';
          //console.log('imagen subida ',resp);
        }, 
          error=> console.log(error)
        );
    //SetPWD,SetDate
    this.cuentas.forEach(element => {
      if (element.id== parseInt(localStorage.getItem('id'))){
        this.accountDetail.password=element.password;
        this.accountDetail.birth_date=element.birth_date.toString()
      }
    });
    //PUT Request
    this.dataService.putAccount(localStorage.getItem('id'),this.accountDetail)
    .subscribe(data => this.accountDetail)
    console.log("Actualizado")
  }

}
