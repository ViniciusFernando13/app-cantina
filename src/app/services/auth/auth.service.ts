import { Injectable } from '@angular/core';
import { ApiProvider } from 'src/app/providers/api/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
   * @param usuario
   */
  public login( usuario ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {

      // faz o login com email e senha
      this.api.post( 'usuarios/login', usuario )
      .then( cli => {

        // guarda as credenciais do usuario atual
        localStorage.setItem( 'auth-user', cli.id );
        resolve( cli );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * insert
   *
   * cadastra o usuario
   *
   * @param usuario
   */
  public insert( usuario ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {
      this.api.post( 'usuarios/insert', usuario )
      .then( cli => {
        resolve( cli );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * update
   *
   * atualiza o usuario
   *
   * @param usuario
   */
  public update( usuario ) {

    // retorna uma promessa
    return new Promise( ( resolve, reject ) => {
      this.api.post( 'usuarios/update', usuario )
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
      this.api.get( 'usuarios/delete/' + id )
      .then( clis => resolve( clis ) )
      .catch( err => reject( err ) );
    });
  }

  /**
   * list
   *
   * pega a listagem de todos os usuarios
   *
   */
  public list() {

    // retorna uma promessa
    return new Promise <Array<any>>( ( resolve, reject ) => {
      this.api.get( 'usuarios/list' )
      .then( clis => {
        resolve( clis as Array<any> );
      } ).catch( err => reject( err ) );
    });
  }

  /**
   * user
   *
   * retorna o id do usuario logado
   *
   */
  user() {
    return localStorage.getItem('auth-user');
  }
}

// End of file
