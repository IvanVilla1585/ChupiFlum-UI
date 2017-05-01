import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {MachineService} from "../../../../../services/production/machine.service";
import {ToastsManager} from "ng2-toastr";
import {ModalEditMachineService} from "../../../../../modals/production/modal-edit-machine/modal-edit-machine.service";

@Component({
  selector: 'app-tablemachines',
  templateUrl: 'tablemachines.component.html',
  styleUrls: ['tablemachines.component.styl'],
  providers: [MachineService, ModalEditMachineService]
})
export class TablemachinesComponent implements OnInit {

  machines: any [];
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

  constructor(
    private _machineService: MachineService,
    private _container: ViewContainerRef,
    private _modalEditMacineService: ModalEditMachineService,
    private _toast: ToastsManager
  ) {
    this.machines = [];
    this.titleModal = '';
    this.color = '';
    this.configModal = {};
    this.pages = [];
    this.search = '';
    this.totalPages = 0;
    this.nextPage = '';
    this.previusPage = '';
    this.numberRegistre = 0;
    this.numberPages = 0;
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.color = 'primary';
    this.titleModal = 'Editar Máquina';
    this.getMachines();
    this.setConfigModal();
  }

  getMachines(){
    this._machineService.list().subscribe(
      (res) => {
        let data = res.json();
        this.machines = data.results;
        this.nextPage = data.next;
        this.previusPage = data.previous;
        this.totalPages = data.count;
        this.calculatePages();
      },
      (err) => {
        this.machines = [];
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
    this.machines = event.units;
    this.nextPage = event.nextPage;
    this.previusPage = event.previusPage;
    this.totalPages = event.totalPages;
  }

  searchUnit(){
    if (this.search !== ''){
      this._machineService.findById(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.machines = data.results;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.machines = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._machineService.list()
        .subscribe(
          (res) => {
            let data = res.json();
            this.machines = data.results;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.machines = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }

  changeStatus(unit: any){
    if (unit.id){
      this._machineService.changeStatus(unit.id)
        .subscribe(
          (res: any) => {
            let data = res.json();
            this.getMachines();
            this._toast.success(`El estado de de la máquina ${data.nombre} fue cambiado`, 'Máquinas!');
          },
          (err) => {
            let data = err.json();
            this._toast.error(data.message, 'Máquinas!');;
          }
        );
    }
  }

  openModal(data){
    this._modalEditMacineService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid){
            this._machineService.update(res.machine)
              .subscribe(
                (res: any) => {
                  this.getMachines();
                  let data = res.json();
                  this._toast.success(`Se actualizó la máquina ${data.nombre}`, 'Máquinas!');
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

}
