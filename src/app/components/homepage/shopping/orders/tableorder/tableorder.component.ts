import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {OrderService} from "../../../../../services/shopping/order.service";
import {ToastsManager} from "ng2-toastr";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-tableorder',
  templateUrl: './tableorder.component.html',
  styleUrls: ['./tableorder.component.styl'],
  providers: [OrderService, ExtracErrorMessages]
})
export class TableorderComponent implements OnInit {


  public orders: any[];
  public pages: any [];
  public keys: any [];
  public search: string;
  public titleModal: string;
  public totalPages: number;
  public color: string;
  public nextPage: string;
  public previusPage: string;
  public numberRegistre: number;
  public numberPages: number;
  public configModal: any;

  constructor(
    private _orderService: OrderService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages,
    private _router: Router
  ){
    this.orders = [];
    this.pages = [];
    this.keys = [];
    this.search = '';
    this.color = '';
    this.titleModal = '';
    this.totalPages = 0;
    this.nextPage = '';
    this.previusPage = '';
    this.numberRegistre = 0;
    this.numberPages = 0;
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.color = 'primary';
    this.numberRegistre = 3;
    this.getProducts();
    this.keys = ['nombre', 'cantidad', 'categoria', 'stock']
  }

  orderDetail(data) {
    this._router.navigate([`/menu/compras/productos/${data.id}`]);
  }

  getProducts(){
    this._orderService.list(`?typelist=true`)
      .subscribe(
        (res) => {
          debugger
          let data = res.json();
          debugger
          this.orders = data.results;
          this.nextPage = data.next;
          this.previusPage = data.previous;
          this.totalPages = data.count;
          this.calculatePages();
        },
        (err) => {
          this.orders = [];
          this.nextPage = '';
          this.previusPage = '';
          this.totalPages = 0;
        }
      );
  }

  calculatePages(){
    let total: number = this.totalPages / this.numberRegistre;
    let parse = parseInt(total.toString());
    this.numberPages = (total === parse) ? parse : (parse + 1);
    this.setPages();
  }

  setPages(){
    for (let i = 1; i <= this.numberPages; i++){
      this.pages.push(i);
    }
  }

  searcMaterial(){
    if (this.search !== ''){
      this._orderService.findById(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.orders = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.orders = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._orderService.list(`?typelist=true`)
        .subscribe(
          (res) => {
            let data = res.json();
            this.orders = data.results;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.orders = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }
}

