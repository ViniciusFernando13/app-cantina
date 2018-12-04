import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { ProdutosService } from 'src/app/services/produtos/produtos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ItensPedidoComponent } from '../itens-pedido/itens-pedido.component';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css'],
  providers: [ClientesService,ProdutosService,PedidosService]
})
export class PedidosListComponent implements OnInit {

  // array com todos os clientes
  clientes: Array<any> = null;

  // cliente do pedido
  cliente = null;
  filtro = 'nome';

  // lista de produtos
  produtos: Array<any> = null;

  // lista de produtos do pedido
  produtosPedido: Array<any> = [];

  // lista de produtos utilizada no select
  produtosList: Array<any> = [];

  // produto selecionado
  produto = null;

  // lista de pedidos
  pedidos: Array<any> = [];

  // quantidade do produto
  quantidade = null;

  // variavel de erro
  mensagemErr = null;
  mensagem = null;

  total = '0';

  constructor(public cliService: ClientesService,
              public prodService: ProdutosService,
              public pedidoService: PedidosService,
              public modal: NgbModal) { }

  
  async init() {
    this.clientes = await this.cliService.list();
    this.produtos = await this.prodService.list();
    this.pedidos = await this.pedidoService.list();
    this.produtosList = this.produtos;
    this.quantidade = null;
    this.cliente = null;
    this.produto = null;
    this.produtosPedido = [];
  }

  async adicionarItem() {
    this.mensagemErr = null;
    let msgErr = '';
    if( !this.produto || !this.produto[0] ){
      msgErr = "<p>Informe um produto a ser adicionado</p>";
    }
    if( !this.quantidade || this.quantidade < 1 ){
      msgErr = msgErr + "<p>Informe uma quantidade válida</p>";
    } else if ( this.quantidade > this.produto[0].estoque ) {
      msgErr = msgErr + `<p>Tem apenas ${ this.produto[0].estoque } no estoque</p>`;
    }
    if( this.produtosPedido.filter( item => item.id == this.produto[0].id ).length > 0 ) {
      msgErr = msgErr + "<p>Produto informado já está na lista, para altera-lo remova e adicione novamente</p>";
    }
    if( msgErr != '' ) {
      this.mensagemErr = msgErr;
      return;
    }
    const produto = this.produto[0];
    this.produtosPedido.push({ id: produto.id, valor: (produto.preco * this.quantidade).toFixed(2), nome: produto.nome, quantidade: this.quantidade });
    const total = parseFloat( this.total ) + produto.preco * this.quantidade;
    console.log(this.total);
    
    this.total = total.toFixed(2);
    this.quantidade = null;
  }

  async salvar() {
    this.mensagemErr = null;
    let msgErr = '';
    if( !this.cliente || !this.cliente[0] ) {
      msgErr = "<p>Informe um cliente</p>"; 
    }
    if( this.produtosPedido.length == 0 ) {
      msgErr = msgErr + "<p>Informe um produto a ser adicionado</p>";
    }
    if( msgErr != '' ) {
      this.mensagemErr = msgErr;
      return;
    }
    this.pedidoService.insert( { cliente: this.cliente[0].id, total: this.total, itens: this.produtosPedido } )
    .then( pedido => {
      console.log(pedido);
    } ).catch( err => this.mensagemErr = err )
    .then( () => this.init() );
  }

  async remover( id ) {
    this.produtosPedido = this.produtosPedido.filter( item => item.id != id );    
  }

  limpar() {
    this.quantidade = null;
    this.cliente = null;
    this.produto = null;
    this.produtosPedido = [];
    this.produtosList = this.produtos;
  }

  async verProdutos( pedido ) {
    const itens = await this.pedidoService.listItens( pedido.id );
    console.log(itens);
    const modal = this.modal.open( ItensPedidoComponent, { size: "lg" } );
    modal.componentInstance.pedido = pedido;
    modal.componentInstance.itens = itens;
    
  }

  ngOnInit() {
    this.init();
  }

}
