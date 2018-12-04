import { Injectable } from '@angular/core';
import { ApiProvider } from 'src/app/providers/api/api';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

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
      this.api.post( 'produtos/insert', produto )
      .then( cli => {
        resolve( cli );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * update
   *
   * atualiza o produto
   *
   * @param produto
   */
  public update( produto ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {
      this.api.post( 'produtos/update', produto )
      .then( cli => {
        resolve( cli );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * updateEstoque
   *
   * atualiza o estoque do produto
   *
   * @param produto
   */
  public updateEstoque( produto ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {
      this.api.post( 'produtos/update_estoque', produto )
      .then( cli => {
        resolve( cli );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * login
   *
   * faz o login
   *
   * @param func
   */
  public delete( id ) {

    // retorna uma promessa
    return new Promise <String>( ( resolve, reject ) => {

      // faz o login com email e senha
      this.api.get( 'produtos/delete/' + id )
      .then( clis => resolve( clis ) )
      .catch( err => reject( err ) );
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
      this.api.get( 'produtos/list' )
      .then( clis => {
        resolve( clis as Array<any> );
      } ).catch( err => reject( err ) );
    });
  }
}
