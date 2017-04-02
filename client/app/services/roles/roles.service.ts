import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Permission} from "../../components/homepage/permissions/roles/rol";


@Injectable()
export class RolesService {

  url: string;

  constructor(private http: Http) {
    this.url = 'http://localhost:8000/api/permisos';
  }

  getPermissions() : Promise<Permission[]> {
    const url = this.url;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Permission[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
