import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos/produtos.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {

  public produtos = [];
  public email = '';
  public preco = '';
  public nome = '';
  public estoque = '';
  public idEstoque = null;
  public id = null;
  public mensagemEstoque = null;
  public mensagemEstoqueErr = null;
  public mensagem = null;
  public mensagemErr = null;

  constructor( public produtosService: ProdutosService ) { }

  async getProdutos() {
    this.produtosService.list()
    .then( clis => this.produtos = clis );
  }

  salvar() {
    if( this.id ) {
      this.produtosService.update( { id: this.id, preco: this.preco, nome: this.nome } )
      .then( cli => {
        this.mensagemErr = null;
        this.limpar();
        this.getProdutos();
        this.mensagem = "Produto editado com sucesso!"
      } ).catch( err => {
        this.mensagemErr = err;     
      } );
    } else {
      this.produtosService.insert( { preco: this.preco, nome: this.nome } )
      .then( cli => {
        this.mensagemErr = null;
        this.limpar();
        this.getProdutos();
        this.mensagem = "Produto cadastrado com sucesso!"
      } ).catch( err => {
        this.mensagemErr = err;  
      } );
    }
  }

  atualizarEstoque() {
    this.produtosService.updateEstoque( { id: this.idEstoque, estoque: this.estoque } )
    .then( prod => {
      this.mensagemEstoqueErr = null;      
      this.mensagemEstoque = "Produto atualizado com sucesso!"     
    } ).catch( err => {
      this.mensagemEstoqueErr = err;      
    } ).then( () => {
      this.limpar();
      this.getProdutos();
    } );
  }

  setProduto( usuario ) {
    this.nome = usuario.nome;
    this.preco = usuario.preco;
    this.id = usuario.id;
  }

  limpar() {
    this.nome = '';
    this.email = '';
    this.estoque = '';
    this.preco = '';
    this.id = null;
    this.idEstoque = null;
  }

  delete( id ) {
    this.produtosService.delete(id)
    .then( success => alert( success ) )
    .catch( err => alert( err ) )
    .then( () => this.getProdutos() );
  }

  ngOnInit() {
    this.getProdutos();
  }

}
