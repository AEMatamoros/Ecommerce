import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html'
})
export class CrearOrdenComponent implements OnInit {
  public status:string;
  public message:string;
  
  constructor() { }

  ngOnInit(): void {
  }


  onFormOrder(){

  }
}
