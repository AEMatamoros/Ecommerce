import { Component, OnInit } from '@angular/core';
import { ComprasComponent } from '../../../pages/home/compras/compras.component';
import { ShopService } from '../../../services/shop/shop.service';
import { EventEmitterService } from '../../../services/shared/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-cards',
  templateUrl: './box-cards.component.html',
  styleUrls: ['./box-cards.component.css']
})
export class BoxCardsComponent implements OnInit {


  constructor(private eventEmitterService:EventEmitterService,
              private router:Router
              ) { }

  ngOnInit(): void {

  }

  filtrar(name: string) {

    this.router.navigate(['/compras']);
    // this.eventEmitterService.buscarCategoria(name);

   /*  this.router.navigate(['/compras']).then(()=>{

    }); */
  }

}
