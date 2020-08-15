import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/services/products/products.service'
import { Ventas } from 'src/app/models/general/ventas';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private dataService:ProductsService) { }
  ventas:Ventas[]
  ngOnInit(): void {
    this.dataService.getSells()
    .subscribe(data =>{this.ventas=data
    console.log(this.ventas)})

  }

}
