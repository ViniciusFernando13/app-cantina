import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  public clientes = [];
  public email = '';
  public apelido = '';
  public nome = '';
  public id = null;
  public mensagemEstoque = null;
  public mensagemEstoqueErr = null;
  public mensagem = null;
  public mensagemErr = null;

  constructor( public clientesService: ClientesService ) { }

  async getClientes() {
    this.clientesService.list()
    .then( clis => this.clientes = clis );
  }

  salvar() {
    if( this.id ) {
      this.clientesService.update( { id: this.id, apelido: this.apelido, nome: this.nome } )
      .then( cli => {
        this.mensagemErr = null;
        this.limpar();
        this.mensagem = "Cliente editado com sucesso!"
      } ).catch( err => {
        this.mensagemErr = err;     
      } ).then( () => {
        this.getClientes();
      } );
    } else {
      this.clientesService.insert( { apelido: this.apelido, nome: this.nome } )
      .then( cli => {
        this.mensagemErr = null;
        this.limpar();
        this.mensagem = "Cliente cadastrado com sucesso!"
      } ).catch( err => {
        this.mensagemErr = err;  
      } ).then( () => {
        this.getClientes();
      } );
    }
  }

  setCliente( usuario ) {
    this.nome = usuario.nome;
    this.apelido = usuario.apelido;
    this.id = usuario.id;
  }

  limpar() {
    this.nome = '';
    this.email = '';
    this.apelido = '';
    this.id = null;
  }

  delete( id ) {
    this.clientesService.delete(id)
    .then( success => alert( success ) )
    .catch( err => alert( err ) )
    .then( () => this.getClientes() );
  }

  ngOnInit() {
    this.getClientes();
  }

}

