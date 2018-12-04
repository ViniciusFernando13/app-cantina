import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  public email = '';
  public senha = '';
  public nome = '';
  public id = null;
  public mensagem = null;
  public mensagemErr = null;
  public clientes = [];

  constructor( public auth: AuthService ) { }

  async getUsuarios() {
    this.auth.list()
    .then( clis => this.clientes = clis );
  }

  salvar() {
    if( this.id ) {
      this.auth.update( { id: this.id, email: this.email, senha: this.senha, nome: this.nome } )
      .then( cli => {
        this.limpar();
        this.getUsuarios();
        this.mensagem = "Usuário editado com sucesso!"  
      } ).catch( err => {
        this.mensagemErr = err;     
      } );
    } else {
      this.auth.insert( { email: this.email, senha: this.senha, nome: this.nome } )
      .then( cli => {
        this.limpar();
        this.getUsuarios();
        this.mensagem = "Usuário cadastrado com sucesso!"  
      } ).catch( err => {
        this.mensagemErr = err;      
      } );
    }
  }

  setUsuario( usuario ) {
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.id = usuario.id;
  }

  limpar() {
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.id = null;
  }

  delete( id ) {
    this.auth.delete(id)
    .then( success => alert( success ) )
    .catch( err => alert( err ) )
    .then( () => this.getUsuarios() );
  }

  ngOnInit() {
    this.getUsuarios();
  }

}
