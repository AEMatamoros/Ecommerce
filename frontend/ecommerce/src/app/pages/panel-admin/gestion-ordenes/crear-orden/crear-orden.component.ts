import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

//Modelos
import { Status } from 'src/app/models/general/general-models';
import { Product } from 'src/app/models/product/product';
import { Account } from 'src/app/models/account/account';

//Servicios
import { OrdenesService } from 'src/app/services/panelAdmin/ordenes.service';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html'
})
export class CrearOrdenComponent implements OnInit {
  public status:string;
  public message:string;
  public cargado:boolean = false;
  public formOrder: FormGroup;
  public statusOrder: Status[];
  public totalStatus: number;
  public productos: Product[];
  public totalProductos: number;
  public usuarios: Account[];
  public totalUsuarios: number;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrdenesService
    
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.obtenerStatus();
    this.obtenerProducts();
    this.obtenerUsuarios();
  }

  crearFormulario(){
    this.formOrder = this.formBuilder.group({
      producto: new FormControl('' ,Validators.required),
      cantidad: ['0', [Validators.required, Validators.minLength(1)] ],
      total: new FormControl({value:0, disabled:true}, [Validators.required, Validators.minLength(1)]),
      status: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  obtenerStatus(){
    this.orderService.getStatus().subscribe(
      ({total, status})=>{
        this.totalStatus = total;
        this.statusOrder = status;
        this.cargado = true;
      }
    )
  }

  obtenerProducts(){
    this.orderService.getProducts().subscribe(
      ({total, products})=>{
        this.cargado = true;
        this.totalProductos = total;
        this.productos = products;
        
        //console.log(this.productos);
      }
    )
  }

  obtenerUsuarios(){
    this.orderService.getUsuarios().subscribe(
      ({total, accounts})=>{
        this.totalUsuarios = total;
        this.usuarios = accounts;
        this.cargado = true;
      }
    )
  }

  total_a_Pagar(){
    let price;
    if(this.cargado){
      price = this.productos['price'];
    }
    
    console.log('form', this.formOrder);
    let cantidad = this.formOrder.value.cantidad;
    let total = price * cantidad;
    console.log('total', total);
  }

  onFormOrder(){
    console.log(this.formOrder.value);
  }
}
