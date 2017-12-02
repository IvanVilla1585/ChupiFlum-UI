import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProviderService} from "../../../../../services/shopping/providers.service";
import {ToastsManager} from "ng2-toastr";
import {ModalEditProviderService} from "../../../../../modals/shopping/modal-edit-provider/modal-edit-provider.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-tablesupplier',
  templateUrl: 'tablesupplier.component.html',
  styleUrls: ['tablesupplier.component.styl'],
  providers: [ProviderService, ModalEditProviderService, ExtracErrorMessages]
})
export class TablesupplierComponent implements OnInit {

  public providers: any[];
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
    private _providersService: ProviderService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _modalEditProviderService: ModalEditProviderService,
    private _extracErrorMessages: ExtracErrorMessages
  ){
    this.providers = [];
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
    this.titleModal = 'Editar Proveedor';
    this.numberRegistre = 3;
    this.getProviders();
    this.keys = ['nombre', 'cantidad', 'categoria', 'stock']
  }

  openModal(data){
    this._modalEditProviderService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid){
            this.getProviders();
            this._toast.success(`Se actualizó el proveedor ${data.empresa}`, 'Proveedores!');
          }else{
            let message = '';
            if (res.status === 400){
              message = this._extracErrorMessages.getMessages(res.error, this.keys);
              this._toast.info(message, 'Proveedores!', {toastLife: 10000})
            }else if (res.status !== 1 && res.status !== 400){
              this._toast.error('Ocurrio un error al actualizar', 'Proveedores!')
            }
            console.log(res.error)
          }
        }
      );
  }

  getProviders(){
    this._providersService.list('?typelist=true')
      .subscribe(
        (res) => {
          debugger
          let data = res.json();
          this.providers = data.results;
          this.nextPage = data.next;
          this.previusPage = data.previous;
          this.totalPages = data.count;
        },
        (err) => {
          this.providers = [];
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

  updateData(event){
    this.providers = event.units;
    this.nextPage = event.nextPage;
    this.previusPage = event.previusPage;
    this.totalPages = event.totalPages;
  }

  searcMaterial(){
    if (this.search !== ''){
      this._providersService.findById(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.providers = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.providers = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._providersService.list(`?typelist=true`)
        .subscribe(
          (res) => {
            let data = res.json();
            this.providers = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.providers = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }

  changeStatus(process: any){
    if (process.id){
      this._providersService.changeStatus(process.id)
        .subscribe(
          (res: any) => {
            let data = res.json();
            this.getProviders();
            this._toast.success(`El estado del proveedor ${data.empresa} fue cambiado`, 'Proveedor!');
          },
          (err) => {
            let data = err.json();
            this._toast.error(data.message, 'Proveedor!');
          }
        );
    }
  }

}
