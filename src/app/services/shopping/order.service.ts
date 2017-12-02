import {BaseService} from '../lib/base.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../libs/HttpClient';
import {Response} from "@angular/http";

@Injectable()
export class OrderService extends BaseService {

  constructor(private httpService: HttpService) {
    super(httpService, 'pedidos');
  }

  getDataUnits(url = ''): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/unidadesmedidas/${url}`);
  }

  getDataMaterial(url = ''): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/materiaprima/${url}`);
  }

  searchUnitMeasure(search): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/materiaprima/?search=${search}`);
  }

  searchSupplier(search): Observable<Response>{
    return this.httpService.get(`${this.BASE_URL}/proveedores/?search=${search}`);
  }
}
