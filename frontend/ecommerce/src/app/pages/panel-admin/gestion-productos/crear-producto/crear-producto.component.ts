import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//rxjs
import { delay } from 'rxjs/operators';

//Modelos
import { AdminProduct } from 'src/app/models/product/AdminProduct';
import { AdminProductImages } from 'src/app/models/product/AdminProductImage';
import { Log } from 'src/app/models/log/log';
import { Action } from 'src/app/models/log/log';

//Servicios
import { SubirArchivoService } from 'src/app/services/panelAdmin/subir-archivo.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { AccountService } from 'src/app/services/panelAdmin/account.service';
import { LogService } from 'src/app/services/log/log.service';

//interfaz para imagen
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {
  public id_admin:number;

  public cargado:boolean = false;
  public status:string = '';
  public message:string = '';

  public formProduct: FormGroup;

  public log_cuentas: Log;
  public action_log: Action;
  
  public products: any;
  public product_edit: any;
  public productFile: File;

  public categories: any;
  public usuarios: any;
 
  public imagenSubida: any;
  public fotoSelected: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private subirArchivo: SubirArchivoService,
    private logService: LogService,
    private productService: ProductsService,
    private accountService: AccountService
  ) {
    this.crearFormulario();
    this.id_admin = parseInt(localStorage.getItem('id'));
   }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe(({id})=> this.cargarProducto(id));

    this.obtenerCategorias();
    this.obtenerUsuarios();
  }

  crearFormulario(){
    this.formProduct = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)] ],
      precio: ['0',Validators.required],
      descripcion: ['',Validators.required],
      categoria: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  cargarProducto(id:number){
    if(id === undefined){
      return false;
    }

    this.productService.getProduct(id).pipe(delay(100))
        .subscribe(
          product=>{
            if(!product){
              this.router.navigateByUrl('admin/productos');
            }
            this.product_edit = product;
            console.log('product_edit', this.product_edit);
            const productForm = {
              name: product.name,
              precio: product.price,
              descripcion: product.description,
              categoria: product.category ? 'Seleccione la categoría': 0,
              usuario: product.user ? 'Seleccione el usuario': 0
            }
            this.formProduct.setValue(productForm);
          }
        )
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
        this.categories = resp['results'];
        //console.log(resp);
      },
      error => { console.log(<any> error); }
    )
  }

  obtenerUsuarios(){
    this.accountService.obtenerCuentas().subscribe(
      resp=>{
        this.cargado = true;
        this.usuarios = resp['results'];
        //console.log(this.usuarios);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  onFormProducto(){
    const params = this.activatedRoute.snapshot.params;
    if(this.formProduct.invalid){
      return Object.values( this.formProduct.controls ).forEach( control => { control.markAsTouched(); });
    }else{ 
      let name = this.formProduct.value.name;
      let price = this.formProduct.value.precio;
      let descripcion = this.formProduct.value.descripcion;
      let categoria = this.formProduct.value.categoria;
      let usuario = this.formProduct.value.usuario;
      let image: number;

      if(this.imagenSubida){
        image = this.imagenSubida['id'];
      }else{
        image = null;
      }

      const product = new AdminProduct(0,name,descripcion,price,categoria,usuario);
      
      if(params.id){
        let id = params.id;
        this.productService.putProduct(id, product).subscribe(
          resp=>{
            const product = resp;
            this.productService.getAllProductsImages().subscribe(
              resp=>{
                const product_images = resp;
                product_images.forEach(element=>{
                  if(element.product_id['id'] == product.id){
                    this.productService.deleteProductImages(element.id).subscribe(
                      resp=>{
                        this.subirArchivo.subirFoto(this.productFile).subscribe(
                          resp=>{
                            product_images['images_id'] = resp['id'];
                            this.productService.postProductImages(product_images).subscribe(
                              resp=>{
                                this.status='success';
                                this.message='Producto editado satisfactoriamente!';
                                
                                this.action_log = new Action(0, 'CRUD PRUDUCT, ACTION:UPDATE PRODUCT: '+product.name);
                                this.logService.postAction(this.action_log).subscribe(
                                    resp=>{
                                      this.log_cuentas = new Log('EDITO PRODUCT '+product.name, this.id_admin, resp['id'])
                                      this.logService.postLog(this.log_cuentas).subscribe( resp=>{console.log(resp);} )
                                    }, 
                                    error=>{console.log(<any> error);}
                                )
                              }
                            )
                          }  
                        )
                      }
                    )
                  }
                })
              }
            )  
            this.router.navigateByUrl('admin/productos');
          },
          error=>{ console.log(<any>error); }
        )

      }else{
        this.productService.addProducto(product).subscribe(
          resp=>{
            this.status = 'success';
            this.message = 'Producto creado exitosamente!';
            const productImage = new AdminProductImages(0, this.imagenSubida['id'], resp['id']);

            this.productService.postProductImages(productImage)
                .subscribe(
                  resp=>{
                    this.status = 'success';
                    const action = new Action(0, 'CRUD PRUDUCT, ACTION: CREATE PRODUCT: '+product.name);
                    
                    this.logService.postAction(action).subscribe(
                          resp=>{
                            this.log_cuentas = new Log('AGREGAR PRODUCT '+product.name, this.id_admin, resp['id'])
                            this.logService.postLog(this.log_cuentas).subscribe( resp=>{console.log(resp);} )
                          }, 
                          error=>{console.log(<any> error);}
                    )
                    //console.log(resp);
                  },
                  error =>{ console.log(<any> error); }
                );
            this.router.navigateByUrl('admin/productos');
          },
          error=>{ console.log(<any>error); }
        )
      }      
    }
  }
}
