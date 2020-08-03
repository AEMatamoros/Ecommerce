import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop/shop.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  public productos;

  constructor( private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.shopService.getProductsImage()
      .subscribe(data => {
        this.productos = data;
        console.log(this.productos);
      });
    }

}
