import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductsService } from 'src/app/services/products/products.service'
import {SubirArchivoService} from 'src/app/services/panelAdmin/subir-archivo.service'
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product/category';
import {ProductImages} from 'src/app/models/product/product-images'

//interfaz para imagen
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() product: Product | any;
  @Input() productDetail =  {id:0,name:'', description:'', price:0, category_id:0,user_id:localStorage.getItem('id')}

  categories: Category[];

  constructor(private dataService:ProductsService,public router:Router,private uploadService:SubirArchivoService) { }
  public produc_images:any
  public imgFile: File;
  public imagenSubida: any;
  public status: string = '';
  public message: string = '';
  public fotoSelected: string | ArrayBuffer;
  public productoSubido:any;
  @Input() productImage= {images_id:'',product_id:''}
  //Seleccionar Foto
  fotoSeleccionada(event: HtmlInputEvent){
    console.log("Seleccionando FOto")
    if(event.target.files && event.target.files[0]){
      this.imgFile = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.fotoSelected = reader.result;
      reader.readAsDataURL(this.imgFile);
      console.log(this.imgFile)

    }
  }

  ngOnInit() {
    this.productDetail.id= this.product.id
    return this.dataService.getCategory()
      .subscribe(data =>this.categories=data['results']) 
  }

  updateproduct() {
    console.log("Actualizando")
    console.log(this.productDetail)
    this.dataService.putProduct(this.product.id,this.productDetail)
        .subscribe((data: {}) => {
        this.product=data
        this.productImage.product_id=this.product.id
        console.log("Producto Actualizado")
        //Eliminar instancias
        this.dataService.getAllProductsImages()
          .subscribe(data=>{
            this.produc_images=data
            this.produc_images.forEach(element => {
              console.log("Eliminando valores antiguso de img")
              if(element.product_id.id==this.product.id){
                console.log(element.id)
                this.dataService.deleteProductImages(element.id)
                  .subscribe(data=>{
                    console.log("Eliminada")
                    console.log(this.imgFile)
                    this.uploadService.subirFoto(this.imgFile)
                    .subscribe(resp => {
                     this.imagenSubida = resp;
                     this.status = 'success';
                     this.message = 'Imagen subida con éxito!';
                     console.log('imagen subida ',resp);
                     this.productImage.images_id=this.imagenSubida.id
                     this.dataService.postProductImages(this.productImage)
                    .subscribe(data=>{
                      location.reload();
                    })
          
          
          }, 
          error=> console.log(error)
        );
                  })
              }
            });
          })
        //
        
        
        //location.reload();
      })
    
    
  }
}

/*this.uploadService.subirFoto(this.imgFile)
        .subscribe(resp => {
          this.imagenSubida = resp;
          this.status = 'success';
          this.message = 'Imagen subida con éxito!';
          console.log('imagen subida ',resp);
          
          
          }, 
          error=> console.log(error)
        );*/ 