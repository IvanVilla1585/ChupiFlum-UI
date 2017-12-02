import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CookieService} from 'angular2-cookie/core';
import {Http, Response, RequestMethod, Request, Headers, BaseRequestOptions} from '@angular/http';

@Injectable()
/**
 * Extensión personalizada de la clase HTTP
 * Permite la configuración de todas las peticiones
 * Captura los envíos y respuestas
 * */
export class HttpService {

  private authorization: string;


  constructor(private http: Http, private _cookieService: CookieService ) {
    this.authorization = '';
    this.subscribeToToken();
  }

  get(url:string):Observable<Response> {
    return this.request(url, RequestMethod.Get);
  }

  post(url:string, body:any) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url:string, body:any) {
    return this.request(url, RequestMethod.Put, body);
  }

  patch(url:string, body:any) {
    return this.request(url, RequestMethod.Patch, body);
  }

  delete(url:string, body:any) {
    return this.request(url, RequestMethod.Delete, body);
  }

  private request(url:string, method:RequestMethod, body?:any):Observable<Response>{

    let headers = new Headers();
    this.setHeaders(headers);

    let options = new BaseRequestOptions();
    options.headers = headers;
    options.url = url;
    options.method = method;
    options.body = body;

    let request = new Request(options);

    return this.http.request(request);
  }

  private subscribeToToken() {
    let jsonString: string = this._cookieService.get("chupiflum.user");
    let user = JSON.parse(jsonString);
    this.authorization = `${user.token_type} ${user.access_token}`;
  }

  /**
   * Interceptor para componer las cabeceras en cada petición
   * */
  private setHeaders(headers: Headers) {
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', this.authorization);
  }

}