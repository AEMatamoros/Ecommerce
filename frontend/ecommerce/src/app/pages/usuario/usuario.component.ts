import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  nombreU = 'Isaac';
  apellidoU = 'Magaña';
  direccionU = 'La penca del maguei';
  telefonoU = '+504 95959595';
  correoU = 'maquinadeguerra@hotmail.com';
  seguidores = 98 ;
  articulosale = 105;
  calidad = '5 Estrellas';
  imageportada = 'assets/icons/baner.png';

  comentarios: any[] = [
    {nombre: 'Manolo', comentario: 'Muy buen servicio', tiempo: 'Una hora'},
    {nombre: 'Miguel', comentario: 'Mas o menos la verdad', tiempo: 'Dos dias'},
    {nombre: 'Rosalia', comentario: 'Me estafó', tiempo: 'tres meses'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
