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

  @Input() accountDetail =  {first_name:'', last_name:'', email:'', phone_number:'',id:localStorage.getItem('id'),birth_date:'',password:'',cover_img:'',user_img:''}
  cuenta:any;
  cuenta_id=localStorage.getItem('id')
  
  public imgFile: File;
  public imagenSubida: any;
  public status: string = '';
  public message: string = '';
  public fotoSelected: string | ArrayBuffer;

  public imgFile2: File;
  public imagenSubida2: any;
  public status2: string = '';
  public message2: string = '';
  public fotoSelected2: string | ArrayBuffer;
  
  ngOnInit(){

     this.dataService.getAccount(this.cuenta_id)
      .subscribe(data =>{this.cuenta=data
      /*console.log(this.cuenta)*/}
      )
      
    
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
  fotoSeleccionada2(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.imgFile2 = <File>event.target.files[0];

      const reader2 = new FileReader();
      reader2.onload = e => this.fotoSelected2 = reader2.result;
      reader2.readAsDataURL(this.imgFile2);

    }
  }
  //FIN
  update(){
    //Subir imagenes
    try{
    var firstname = (<HTMLInputElement>document.getElementById("first_name")).value;
    var lastname = (<HTMLInputElement>document.getElementById("last_name")).value;
    var phone = (<HTMLInputElement>document.getElementById("phone_number")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    }catch{
      alert("Todos los campos deben ser rellenados para actualizar la informacion")
    }
    
    if(firstname.length >3 || lastname.length >3 || phone.length >5 || email.length >5){
    if(firstname!="" && lastname!="" && phone!="" && email!=""){
    //console.log("Intentando Actualizar")
    setTimeout(function() { 
      alert('Espere un momento antes de actualizar la pagina,se le notificara cuando el proceso haya terminado'); }, 1);
        //Imagen 2
        if(this.imgFile && this.imgFile2){
        this.uploadService.subirFoto(this.imgFile2)
        .subscribe(resp2 => {
          this.imagenSubida2 = resp2;
          this.status2 = 'success';
          this.message2 = 'Imagen subida con éxito!';
          //console.log('imagen subida ',resp2);
              //SetPWD,SetDate      
              this.accountDetail.password=this.cuenta.password;
              this.accountDetail.birth_date=this.cuenta.birth_date.toString()
              this.accountDetail.user_img=this.imagenSubida2.id
            
          //PUT Request
          this.dataService.putAccount(localStorage.getItem('id'),this.accountDetail)
          .subscribe(data => {this.accountDetail
            alert("Se han actualizado los datos")
            this.uploadService.subirFoto(this.imgFile)
        .subscribe(resp => {
          this.imagenSubida = resp;
          this.status = 'success';
          this.message = 'Imagen subida con éxito!';
          //console.log('imagen subida ',resp);
              //SetPWD,SetDate
          
              this.accountDetail.password=this.cuenta.password;
              this.accountDetail.birth_date=this.cuenta.birth_date.toString()
              this.accountDetail.cover_img=this.imagenSubida.id
            
          //PUT Request
          this.dataService.putAccount(localStorage.getItem('id'),this.accountDetail)
          .subscribe(data => {this.accountDetail
            location.reload();})})
          //console.log("Actualizado")
              }, 
          error=> {console.log(error)
          alert("Debe seleccioar una imagen de portada")}
        );
            
          //console.log("Actualizado")
          
              }, 
          error=> {console.log(error)
            alert("Debe seleccioar una imagen de perfil")}
        );
      }else{
        //alert("No toda la adata")
        
        this.accountDetail.password=this.cuenta.password;
        this.accountDetail.birth_date=this.cuenta.birth_date.toString()
        this.accountDetail.cover_img=this.cuenta.cover_img.id
        this.accountDetail.user_img=this.cuenta.user_img.id
      
    //PUT Request
    this.dataService.putAccount(localStorage.getItem('id'),this.accountDetail)
    .subscribe(data => {this.accountDetail
      location.reload();})
      }
            }else{
              alert("Debe rellear todos los campos")
            }                
  }else{
    alert("Los campos no cumplen con los requisitos de tamaño")
  }
}
}
