import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', ]
})
export class NavbarComponent implements OnInit {

  constructor(public auth: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  salir(){
    this.auth.logoutUser();
    this.router.navigateByUrl('/login');
  }

}
