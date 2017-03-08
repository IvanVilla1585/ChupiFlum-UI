import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {User} from "../../components/login/user";

@Injectable()
export class AuthService {

  private url : string;
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {

    this.url = 'http://localhost:8000/api/sigin';
  }


  loginUser(data): Promise<User> {
    return this.http.post(this.url, JSON.stringify(data), this.options)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
