import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre = 'Isaac';
  apellido = 'Magaña';
  imageperfil = 'assets/icons/baner.png';
  imageportada = 'assets/icons/img.png';
  constructor() { }

  ngOnInit(): void {
  }

}
