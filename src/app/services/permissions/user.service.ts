import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../libs/HttpClient';
import {Response} from "@angular/http";


@Injectable()
export class UserService{

  private BASE_URL: string;

  constructor(private _httpService: HttpService){
    this.BASE_URL = 'http://localhost:8000/api';
  }

  list(url = ''): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/users/${url}`);
  }

  listPage(url: string): Observable<Response>{
    return this._httpService.get(url);
  }

  save(data): Observable<Response>{
    return this._httpService.post(`${this.BASE_URL}/users/`, JSON.stringify(data));
  }

  findById(search): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/users/?search=${search}`);
  }

  update(data: any): Observable<Response>{
    return this._httpService.put(`${this.BASE_URL}/users/${data.id}/`, JSON.stringify(data));
  }

  changeStatus(id: number): Observable<Response>{
    return this._httpService.delete(`${this.BASE_URL}/users/${id}/`, JSON.stringify({}));
  }

  getGroups(): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/grupos/`);
  }

  activeAccount(data): Observable<Response>{
    return this._httpService.patch(`${this.BASE_URL}/users/${data.id}/`, data);
  }

  getId(token): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/users/account/?token=${token}`);
  }
}
