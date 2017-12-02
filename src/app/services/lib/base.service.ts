import {Observable} from 'rxjs';
import {Response} from "@angular/http";


export class BaseService {

  public BASE_URL: string;

  constructor(private _httpService: any, private SERVICE_URL: string){
    this.BASE_URL = 'http://localhost:8000/api';
  }

  list(type: string = ''): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/${this.SERVICE_URL}/${type}`);
  }

  listPage(url: string): Observable<Response>{
    return this._httpService.get(url);
  }

  save(data: any): Observable<Response>{
    return this._httpService.post(`${this.BASE_URL}/${this.SERVICE_URL}/`, JSON.stringify(data));
  }

  findById(search: string): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/${this.SERVICE_URL}/?search=${search}`);
  }

  getById(id: number): Observable<Response>{
    return this._httpService.get(`${this.BASE_URL}/${this.SERVICE_URL}/${id}`);
  }

  update(data: any): Observable<Response>{
    return this._httpService.put(`${this.BASE_URL}/${this.SERVICE_URL}/${data.id}/`, JSON.stringify(data));
  }

  changeStatus(id: number): Observable<Response>{
    return this._httpService.delete(`${this.BASE_URL}/${this.SERVICE_URL}/${id}/`, JSON.stringify({}));
  }
}
