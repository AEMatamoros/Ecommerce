import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';

import {filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  
  public titulo: string = '';
  public tituloSubs$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 

    this.tituloSubs$ = this.getArgumentosRutas()
                           .subscribe( ({titulo} ) => {
                              this.titulo = titulo;
                              document.title = `Admin - ${ titulo }`;
                           });
  }

  ngOnInit(): void {
  }

  getArgumentosRutas() {
    return this.router.events.pipe(
        filter( evento => evento instanceof ActivationEnd  ),
        filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
        map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

}
