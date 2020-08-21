import { Component, OnInit, Input } from '@angular/core';
import {SubirArchivoService} from 'src/app/services/panelAdmin/subir-archivo.service'
import { ProductsService } from 'src/app/services/products/products.service'
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product/category';
import { Currency } from 'src/app/models/product/currency';
import { ProductImages} from 'src/app/models/product/product-images'

//interfaz para imagen
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private dataService:ProductsService,public router:Router,private uploadService:SubirArchivoService) { }

  //PostProductInputForm
  @Input() productDetail =  {name:'', description:'', price:0, category_id:0,user_id:localStorage.getItem('id')}
  @Input() productImage= {images_id:'',product_id:''}
  //Objetos
  categories:Category[];
  currencies:Currency[];

  
  public imgFile: File;
  public imagenSubida: any;
  public status: string = '';
  public message: string = '';
  public fotoSelected: string | ArrayBuffer;
  public productoSubido:any;
  //Seleccionar Foto
  fotoSeleccionada(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.imgFile = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.fotoSelected = reader.result;
      reader.readAsDataURL(this.imgFile);

    }
  }
  ngOnInit(){
    return this.dataService.getCategory()
      .subscribe(data =>this.categories=data['results']);
  }


  addproduct() {
    console.log("Subiendo")
    if(this.imgFile){
    this.dataService.postProduct(this.productDetail)
        .subscribe(data => {
            this.productoSubido=data
            console.log(this.productoSubido)
            this.productImage.product_id=this.productoSubido.id
            console.log("Producto Agregado")
            this.uploadService.subirFoto(this.imgFile)
        .subscribe(resp => {
          this.imagenSubida = resp;
          this.status = 'success';
          this.message = 'Imagen subida con éxito!';
          console.log('imagen subida ',resp);
          console.log("Creando", this.productDetail);
          this.productImage.images_id=this.imagenSubida.id
          console.log(this.productImage)
          this.dataService.postProductImages(this.productImage)
          .subscribe(data=>{this.productImage
          console.log("Finalizado")
          location.reload();})
          
          }, 
          error=> console.log(error)
        );
          })
        }else{
          alert("Debe Seleccionar Una Imagen")
        }
    //SUbir imagen del Producto
    
    

    
  }
}
