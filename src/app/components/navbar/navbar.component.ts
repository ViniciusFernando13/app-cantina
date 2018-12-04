import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUrl = null;

  constructor( public router: Router, 
               public auth: AuthService ) {  
  }

  ngOnInit() {
    this.currentUrl = window.location.href.replace('http://localhost:4200/painel',''); 
  }

  async logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  setRoute( route ) {
    this.currentUrl = route;
  }

}
