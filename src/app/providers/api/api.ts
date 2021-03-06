import { Router } from '@angular/router';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import config from './api.config';

@Injectable()
export class ApiProvider {

  /**
   * Url da API
   *
   */
  public url;

  /**
   * Chava da api
   *
   */
  public apiKey;


  /**
   * constructor
   *
   * método construtor
   *
   */
  constructor( public http: Http,
               private router: Router ) {

    // Pega a url
    this.url = config.url;

    // Pega a chave de configuração
    this.apiKey = config.key;
  }

  /**
   * getHeaders
   *
   * pega os headers que vao ser enviados
   *
   * @return {RequestOptionsArgs}
   */
  private getHeaders(): RequestOptionsArgs {

    // pega os itens salvos no localstorage
    const id    = localStorage.getItem( 'auth-id' );

    // seta os headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Api-Key'     : this.apiKey,
      'Auth-Id'     : id
    });

    // volta o objt
    return { headers };
  }

  /**
   * get
   *
   * envia um get ao servidor
   *
   * @param {string} url url da requisicao
   *
   */
  public get( url ) {
    return this.__call( url, {}, 'get' );
  }

  /**
   * post
   *
   * envia um post para o servidor
   *
   * @param {string} url url da requisicao
   * @param {Object} data dados que serao enviados ao servidor
   *
   */
  public post( url, data ) {
    return this.__call( url, data, 'post' );
  }

  /**
   * __call
   *
   * faz uma requisicao ao servidor
   *
   * @param {string} requestUrl url da requisicao
   * @param {Object} data os dados a serem enviados
   * @param {string} method o metodo usado na request
   *
   */
  private __call( requestUrl, data, method ) {

    // Retorna a promessa
    return new Promise<any>( ( resolve, reject ) => {

      // seta a url
      requestUrl = `${this.url}${requestUrl}`;

      // Monta os dados
      const body = JSON.stringify( data );

      // seta as opcoes
      const options = new RequestOptions( this.getHeaders() );

      // Se recebeu o metodo (POST)
      const req = ( method === 'post' ) ? this.http.post( requestUrl, body, options ) : this.http.get( requestUrl, options );

      // pega a resposta
      req.toPromise()
      .then( data => {

        // pega a resposta
        const body = data.json();

        // pega a resposta
        if ( !body.status ) {
          reject( 'Erro na resposta da requisicao' );
          return;
        }

        // verifica o código
        switch ( body.status ) {
          case 777:

            // navega para o login
            this.router.navigateByUrl( '/assinatura' );
            reject( body.data.message );
          break;
          case 500:

            reject( body.data.message );
          break;
          case 200:
            resolve( body.data );
          break;
          case 403:

            // limpa o local storage
            localStorage.clear();

            // navega para o login
            this.router.navigateByUrl( '/home' );
            reject( 'Acesso negado' );
          break;
        }
      })
      .catch( error => reject( error ) );
    });
  }
}

// End of file
