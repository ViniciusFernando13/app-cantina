import { Injectable } from '@angular/core';
import { ApiProvider } from 'src/app/providers/api/api';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  /**
   * Método constructor
   *
   */
  constructor(public api: ApiProvider) {
  }


  /**
   * insert
   *
   * cria o produto
   *
   * @param produto
   */
  public insert( produto ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {
      this.api.post( 'pedidos/insert', produto )
      .then( cli => {
        resolve( cli );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * list
   *
   * pega a listagem dos produtos
   *
   */
  public list() {

    // retorna uma promessa
    return new Promise <Array<any>>( ( resolve, reject ) => {
      this.api.get( 'pedidos/list' )
      .then( pedidos => {
        resolve( pedidos as Array<any> );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * list
   *
   * pega a listagem dos produtos
   *
   */
  public listItens( idPedido ) {

    // retorna uma promessa
    return new Promise <Array<any>>( ( resolve, reject ) => {
      this.api.get( 'pedidos/list_itens/' + idPedido )
      .then( itens => {
        resolve( itens as Array<any> );
      } ).catch( err => reject( err ) );
    });
  }
}
