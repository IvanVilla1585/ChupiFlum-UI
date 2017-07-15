import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {User} from "../../components/login/user";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  private headers : Headers;
  private options : RequestOptions;
  private client_id: string;
  private client_secret: string;
  private grant_type: string;
  private BASE_URL: string;
  
  constructor(private _http: Http, private _cookieService: CookieService) {

    this.BASE_URL = 'http://localhost:8000/api';
    this.headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.grant_type = 'password';
    this.client_id = 'sUtZcpjFIwRfKeZnhkHchGOVaBlAYhzfaIZwMC4n';
    this.client_secret = 'Ba4D0LNi2dp0cyvB9ABIVDpSZfDpGOyCP9r62bTHfMWlfIq9gFmXD53mnRGF0Hg7v5baUkuU3nBwWOcr5USZuE0a40NTU2KGGEd5hrS371iHInnqKUd3SI36flZWEJ8L';
  }

  login(data): Observable<any> {
    return this._http.post(`${this.BASE_URL}/sigin`, JSON.stringify(data), this.options)
      .map((res: any) => res.json())
      .mergeMap((response: any) => {
        let json = this.completeDataToken(data);
        return this._http.post(`${this.BASE_URL}/token/`, JSON.stringify(json), this.options)
        .map((res: any) => {
          let token = res.json();
          response.user.access_token = token.access_token;
          response.user.token_type = token.token_type;
          response.user.expires_in = token.expires_in;
          response.user.refresh_token = token.refresh_token;
          response.user.last_login = new Date()
          return response;
        });
      });
  }

  completeDataToken(data){
    data.grant_type = this.grant_type;
    data.client_id = this.client_id;
    data.client_secret = this.client_secret;
    return data;
  }

  storeCookie(user){
    this._cookieService.put('chupiflum.user', JSON.stringify(user));
  }

  getCookie(){
    return this._cookieService.get("chupiflum.user");
  }

}
