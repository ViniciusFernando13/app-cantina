import { Injectable } from '@angular/core';
import { ApiProvider } from 'src/app/providers/api/api';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  /**
   * Método constructor
   *
   */
  constructor(public api: ApiProvider) {
  }


  /**
   * login
   *
   * faz o login
   *
   * @param func
   */
  public insert( cliente ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {

      // faz o login com email e senha
      this.api.post( 'clientes/insert', cliente )
      .then( cli => {

        // guarda as credenciais do usuario atual
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
  public update( cliente ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {

      // faz o login com email e senha
      this.api.post( 'clientes/update', cliente )
      .then( cli => {

        // guarda as credenciais do usuario atual
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
      this.api.get( 'clientes/delete/' + id )
      .then( clis => resolve( clis ) )
      .catch( err => reject( err ) );
    });
  }

  /**
   * login
   *
   * faz o login
   *
   * @param func
   */
  public list() {

    // retorna uma promessa
    return new Promise <Array<any>>( ( resolve, reject ) => {

      // faz o login com email e senha
      this.api.get( 'clientes/list' )
      .then( clis => {

        // guarda as credenciais do usuario atual
        resolve( clis as Array<any> );
      } ).catch( err => reject( err ) );
    });
  }
}
