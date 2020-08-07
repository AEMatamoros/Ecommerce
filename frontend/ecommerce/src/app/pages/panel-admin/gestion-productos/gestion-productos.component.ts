import { Component, OnInit } from '@angular/core';

//Servicios
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts();
  }

}
