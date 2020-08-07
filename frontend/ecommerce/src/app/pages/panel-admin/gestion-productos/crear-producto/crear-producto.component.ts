import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//Servicios
import { SubirArchivoService } from 'src/app/services/panelAdmin/subir-archivo.service';
import { ProductsService } from 'src/app/services/products/products.service';

//interfaz para imagen
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {
  public cargado:boolean = false;
  public status:string = '';
  public message:string = '';
  public formProduct: FormGroup;
  public products: any;
  public categories: any;
  public productFile: File;
  public imagenSubida: any;
  public fotoSelected: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private subirArchivo: SubirArchivoService,
    private productService: ProductsService
  ) {
    this.crearFormulario();
   }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  crearFormulario(){
    this.formProduct = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)] ],
      precio: ['0',Validators.required],
      descripcion: ['',Validators.required],
      categoria: new FormControl('', [Validators.required])
    });
  }

  fotoSeleccionada(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.productFile = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.fotoSelected = reader.result;
      reader.readAsDataURL(this.productFile);

    }
  }

  subirFoto(){
    this.subirArchivo.subirFoto(this.productFile)
        .subscribe(resp => {
          this.imagenSubida = resp;
          this.status = 'success';
          this.message = 'Imagen subida con éxito!';
          //console.log('imagen subida ',resp);
        }, 
          error=> console.log(error)
        );
  }

  obtenerCategorias(){
    this.productService.getCategory().subscribe(
      resp => {
        this.cargado = true;
        this.categories = resp;
        //console.log(resp);
      },
      error => {
        console.log(<any> error);
      }
    )
  }

  obtenerProductos(){
    this.productService.getProductsImages().subscribe(
      resp => {
        this.cargado = true;
        this.products = resp;
        //console.log(resp);
      },
      error => console.log(<any>error)
    )
  }

}
