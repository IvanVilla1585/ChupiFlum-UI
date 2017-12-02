import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from "../../../../../services/production/product.service";
import {ToastsManager} from "ng2-toastr";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-tableproducts',
  templateUrl: './tableproducts.component.html',
  styleUrls: ['./tableproducts.component.styl'],
  providers: [ProductService, ExtracErrorMessages]
})
export class TableproductsComponent implements OnInit {

  public products: any[];
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
    private _productService: ProductService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages,
    private _router: Router
  ){
    this.products = [];
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

  productDetail(data) {
    this._router.navigate([`/menu/produccion/productoterminado/${data.id}`]);
  }

  getProducts(){
    this._productService.list(`?typelist=true`)
      .subscribe(
        (res) => {
          let data = res.json();
          debugger
          this.products = data.results;
          this.nextPage = data.next;
          this.previusPage = data.previous;
          this.totalPages = data.count;
          this.calculatePages();
        },
        (err) => {
          this.products = [];
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
      this._productService.findById(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.products = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.products = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._productService.list(`?typelist=true`)
        .subscribe(
          (res) => {
            let data = res.json();
            this.products = data.results;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.products = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }

  changeStatus(process: any){
    if (process.id){
      this._productService.changeStatus(process.id)
        .subscribe(
          (res: any) => {
            let data = res.json();
            this.getProducts();
            this._toast.success(`El estado del producto ${data.nombre} fue cambiado`, 'Producto Terminado!');
          },
          (err) => {
            let data = err.json();
            this._toast.error(data.message, 'Producto Terminado!');
          }
        );
    }
  }

}

