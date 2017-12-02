import {BaseService} from '../lib/base.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../libs/HttpClient';
import {Response} from "@angular/http";

@Injectable()
export class ProductService extends BaseService {

  constructor(private httpService: HttpService) {
    super(httpService, 'productoterminado');
  }

  getDataUnits(url = ''): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/unidadesmedidas/${url}`);
  }

  getDataCategory(url = ''): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/categoria/${url}`);
  }

  getDataPresentations(url = ''): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/presentacion/${url}`);
  }

  getDataProcess(url = ''): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/procesos/${url}`);
  }

  getDataMaterial(url = ''): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/materiaprima/${url}`);
  }
}
