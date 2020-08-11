import { Component, OnInit } from '@angular/core';

declare function customInitFunctions();

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styles: []
})
export class PanelAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
