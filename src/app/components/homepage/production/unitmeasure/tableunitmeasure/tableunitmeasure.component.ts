import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UnitmeasureService} from "../../../../../services/production/unitmeasure.service";
import {ToastsManager} from "ng2-toastr";
import {MdDialogRef} from "@angular/material";
import {EditUnitMeasureComponent} from "../../../../../modals/production/edit-unit-measure/edit-unit-measure.component";
import {ModalEditUnitService} from "../../../../../modals/production/edit-unit-measure/edit-unit-measure.service";

@Component({
  selector: 'app-tableunitmeasure',
  templateUrl: './tableunitmeasure.component.html',
  styleUrls: ['./tableunitmeasure.component.styl'],
  providers: [UnitmeasureService, ModalEditUnitService]
})
export class TableunitmeasureComponent implements OnInit {

  public units: any [];
  public pages: any [];
  public search: string;
  public titleModal: string;
  public totalPages: number;
  public color: string;
  public nextPage: string;
  public previusPage: string;
  public numberRegistre: number;
  public numberPages: number;
  public configModal: any;
  public dialogRef: MdDialogRef<EditUnitMeasureComponent>;

  constructor(
    private _unitmeasureService: UnitmeasureService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _modalEditUnitService: ModalEditUnitService
  ){
    this.units = [];
    this.pages = [];
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
    this.titleModal = 'Editar Unidad de Medida';
    this.numberRegistre = 3;
    this.getUnits();
    this.setConfigModal();
  }

  openModal(data){
    this._modalEditUnitService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid){
            this._unitmeasureService.update(res.unit)
              .subscribe(
                (res: any) => {
                  this.getUnits();
                  let data = res.json();
                  this._toast.success(`Se actualizó la unidad de medida ${data.nombre}`, 'Unidad de Medida!');
                }
              );
          }
        }
      );
  }

  setConfigModal(){
    this.configModal = {
      disableClose: false,
      width: '550px',
      height: '',
      position: {
        top: '40px',
        bottom: '',
        left: '',
        right: ''
      },
      data: {}
    };
  }

  getUnits(){
    this._unitmeasureService.list()
      .subscribe(
        (res) => {
          let data = res.json();
          this.units = data.results;
          this.nextPage = data.next;
          this.previusPage = data.previous;
          this.totalPages = data.count;
          this.calculatePages();
        },
        (err) => {
          this.units = [];
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
    this.units = event.units;
    this.nextPage = event.nextPage;
    this.previusPage = event.previusPage;
    this.totalPages = event.totalPages;
  }

  searchUnit(){
    if (this.search !== ''){
      this._unitmeasureService.searchUnitMeasure(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.units = data.results;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.units = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._unitmeasureService.list()
        .subscribe(
          (res) => {
            let data = res.json();
            this.units = data.results;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.units = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }

  changeStatus(unit: any){
    if (unit.id){
      this._unitmeasureService.changeStatus(unit.id)
        .subscribe(
          (res: any) => {
            let data = res.json();
            this.getUnits();
            this._toast.success(`El estado de de la unidad de medida ${data.nombre} fue cambiado`, 'Unidad de Medida!');
          },
          (err) => {
            let data = err.json();
            this._toast.error(data.message, 'Unidad de Medida!');;
          }
        );
    }
  }

}
