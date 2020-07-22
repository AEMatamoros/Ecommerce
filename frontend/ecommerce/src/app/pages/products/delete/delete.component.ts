import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductsService } from 'src/app/services/products/products.service'
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product/category';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() product: Product
  constructor(private dataService:ProductsService,public router:Router) { }
  ngOnInit(): void {
  }
  
  eraseproduct() {
    console.log("Actualizando")
    this.dataService.deleteProduct(this.product.id)
      .subscribe((data: {}) => {
        this.router.navigate(['/my_products'])
      })
}
}
