import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = '';
  public senha = '';
  public erro = null;
 
  constructor( public router: Router, public auth: AuthService ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login( { email: this.email, senha: this.senha } )
    .then( cli => {      
      this.router.navigate(['/painel']);
    } ).catch( err => this.erro = err );
  }
}
