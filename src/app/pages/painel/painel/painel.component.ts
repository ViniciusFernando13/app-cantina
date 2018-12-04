import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos/produtos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public produtos = [];
  public pedidos = [];

  constructor( public produtosService: ProdutosService,
               public pedidosService: PedidosService ) { }

  async getProdutos() {
    this.pedidos = await this.pedidosService.listUltimoMes();
    this.produtosService.listEstoqueFinal()
    .then( clis => this.produtos = clis );
  }

  ngOnInit() {
    this.getProdutos();
  }

}
