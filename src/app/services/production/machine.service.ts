import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../libs/HttpClient';
import {Response} from "@angular/http";


@Injectable()
export class MachineService{

  private BASE_URL: string;

  constructor(private _httpService: HttpService){
    this.BASE_URL = 'http://localhost:8000/api';
  }

  list(): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/maquinas/`);
  }

  listPage(url: string): Observable<Response>{
    return this._httpService.get(url);
  }

  save(data): Observable<Response>{
    return this._httpService.post(`${this.BASE_URL}/maquinas/`, JSON.stringify(data));
  }

  findById(search): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/maquinas/?search=${search}`);
  }

  update(data: any): Observable<Response>{
    return this._httpService.put(`${this.BASE_URL}/maquinas/${data.id}/`, JSON.stringify(data));
  }

  changeStatus(id: number): Observable<Response>{
    return this._httpService.delete(`${this.BASE_URL}/maquinas/${id}/`, JSON.stringify({}));
  }

  getUnits(): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/unidadesmedidas/`);
  }
}