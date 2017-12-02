import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {RawMaterialService} from "../../../../../services/shopping/raw-material.service";
import {ToastsManager} from "ng2-toastr";
import {ModalEditRawMaterialService} from "../../../../../modals/shopping/modal-edit-raw-material/modal-edit-raw-material.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-tablerawmaterial',
  templateUrl: './tablerawmaterial.component.html',
  styleUrls: ['./tablerawmaterial.component.styl'],
  providers: [RawMaterialService, ModalEditRawMaterialService, ExtracErrorMessages]
})
export class TablerawmaterialComponent implements OnInit {

  public rawMaterials: any[];
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
    private _rawMaterialService: RawMaterialService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _modalEditRawMaterialService: ModalEditRawMaterialService,
    private _extracErrorMessages: ExtracErrorMessages
  ){
    this.rawMaterials = [];
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
    this.titleModal = 'Editar Materia Prima';
    this.numberRegistre = 3;
    this.getMaterials();
    this.keys = ['nombre', 'cantidad', 'categoria', 'stock']
  }

  openModal(data){
    this._modalEditRawMaterialService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid){
            this.getMaterials();
            this._toast.success(`Se actualizó la materia prima ${data.nombre}`, 'Materia Prima!');
          }else{
            let message = '';
            if (res.status === 400){
              message = this._extracErrorMessages.getMessages(res.error, this.keys);
              this._toast.info(message, 'Materia Prima!', {toastLife: 10000})
            }else if (res.status !== 1 && res.status !== 400){
              this._toast.error('Ocurrio un error al actualizar', 'Materia Prima!')
            }
            console.log(res.error)
          }
        }
      );
  }

  getMaterials(){
    this._rawMaterialService.list(`?typelist=true`)
      .subscribe(
        (res) => {
          let data = res.json();
          debugger
          this.rawMaterials = data.results;
          this.nextPage = data.next;
          this.previusPage = data.previous;
          this.totalPages = data.count;
          this.calculatePages();
        },
        (err) => {
          this.rawMaterials = [];
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
    this.rawMaterials = event.units;
    this.nextPage = event.nextPage;
    this.previusPage = event.previusPage;
    this.totalPages = event.totalPages;
  }

  searcMaterial(){
    if (this.search !== ''){
      this._rawMaterialService.findById(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.rawMaterials = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.rawMaterials = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._rawMaterialService.list(`?typelist=true`)
        .subscribe(
          (res) => {
            let data = res.json();
            this.rawMaterials = data.results;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.rawMaterials = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }

  changeStatus(process: any){
    if (process.id){
      this._rawMaterialService.changeStatus(process.id)
        .subscribe(
          (res: any) => {
            let data = res.json();
            this.getMaterials();
            this._toast.success(`El estado de la materia ${data.nombre} fue cambiado`, 'Materia Prima!');
          },
          (err) => {
            let data = err.json();
            this._toast.error(data.message, 'Materia Prima!');
          }
        );
    }
  }

}
