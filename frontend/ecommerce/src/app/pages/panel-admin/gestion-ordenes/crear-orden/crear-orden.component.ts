import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html'
})
export class CrearOrdenComponent implements OnInit {
  public status:string;
  public message:string;
  public formOrder: FormGroup
  constructor() { }

  ngOnInit(): void {
  }


  onFormOrder(){

  }
}
