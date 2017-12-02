import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProcessService} from "../../../../../services/production/process.service";
import {ToastsManager} from "ng2-toastr";
import {ModalEditProcessService} from "../../../../../modals/production/modal-edit-process/modal-edit-process.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-tableprocess',
  templateUrl: './tableprocess.component.html',
  styleUrls: ['./tableprocess.component.styl'],
  providers: [ProcessService, ModalEditProcessService, ExtracErrorMessages]
})
export class TableprocessComponent implements OnInit {

  public process: any [];
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
    private _processService: ProcessService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _modalEditProcessService: ModalEditProcessService,
    private _extracErrorMessages: ExtracErrorMessages
  ){
    this.process = [];
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
    this.titleModal = 'Editar Proceso';
    this.numberRegistre = 3;
    this.getMachines();
    this.setConfigModal();
    this.keys = ['nombre', 'maquina', 'tiempo'];
  }

  openModal(data){
    this._modalEditProcessService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid){
            this.updateProcess(res);
          }
        }
      );
  }

  updateProcess(res){
    this._processService.update(res.process)
      .subscribe(
        (res: any) => {
          this.getMachines();
          let data = res.json();
          this._toast.success(`Se actualizó el proceso ${data.nombre}`, 'Procesos!');
        },
        (err) => {
          if (err.status === 400){
            let message = '';
            message = this._extracErrorMessages.getMessages(err.json(), this.keys);
            this._toast.info(message, 'Procesos!', {toastLife: 10000})
          }else{
            this._toast.error('Ocurrio un error al crear', 'Procesos!')
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
  getMachines(){
    this._processService.list(`?typelist=true`)
      .subscribe(
        (res) => {
          let data = res.json();
          this.process = data.results;
          this.nextPage = data.next;
          this.previusPage = data.previous;
          this.totalPages = data.count;
          this.calculatePages();
        },
        (err) => {
          this.process = [];
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
    this.process = event.units;
    this.nextPage = event.nextPage;
    this.previusPage = event.previusPage;
    this.totalPages = event.totalPages;
  }

  searchUnit(){
    if (this.search !== ''){
      this._processService.findById(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.process = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.process = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._processService.list(`?typelist=true`)
        .subscribe(
          (res) => {
            let data = res.json();
            this.process = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.process = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }

  changeStatus(process: any){
    if (process.id){
      this._processService.changeStatus(process.id)
        .subscribe(
          (res: any) => {
            let data = res.json();
            this.getMachines();
            this._toast.success(`El estado del proceso ${data.nombre} fue cambiado`, 'Procesos!');
          },
          (err) => {
            let data = err.json();
            this._toast.error(data.message, 'Procesos!');;
          }
        );
    }
  }

}
