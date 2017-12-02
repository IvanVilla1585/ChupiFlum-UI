import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../../../../../services/permissions/user.service";
import {ToastsManager} from "ng2-toastr";
import {ModalEditUserService} from "../../../../../modals/permissions/modal-edit-user/modal-edit-user.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";

@Component({
  selector: 'app-tableusers',
  templateUrl: './tableusers.component.html',
  styleUrls: ['./tableusers.component.styl'],
  providers: [UserService, ModalEditUserService, ExtracErrorMessages]
})
export class TableusersComponent implements OnInit {

  public users: any[];
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
    private _userService: UserService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _modalEditUserService: ModalEditUserService,
    private _extracErrorMessages: ExtracErrorMessages
  ){
    this.users = [];
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
    this.titleModal = 'Editar Usuario';
    this.numberRegistre = 3;
    this.getUsers();
    this.keys = ['nombre', 'cantidad', 'categoria', 'stock']
  }

  openModal(data){
    this._modalEditUserService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid){
            this._userService.update(res.user)
              .subscribe(
                (res: any) => {
                  this.getUsers();
                  let data = res.json();
                  this._toast.success(`Se actualizó el usuario ${data.first_name} ${data.last_name}`, 'Usuarios!');
                },
                (err: any) => {
                  let message = '';
                  if (res.status === 400){
                    message = this._extracErrorMessages.getMessages(res.error, this.keys);
                    this._toast.info(message, 'Usuarios!', {toastLife: 10000})
                  }else if (res.status !== 1 && res.status !== 400){
                    this._toast.error('Ocurrio un error al actualizar', 'Usuarios!')
                  }
                  console.log(res.error)
                }
              );
          }
        }
      );
  }

  getUsers(){
    this._userService.list(`?typelist=true`)
      .subscribe(
        (res) => {
          let data = res.json();
          this.users = data.results;
          this.nextPage = data.next;
          this.previusPage = data.previous;
          this.totalPages = data.count;
          //this.calculatePages();
        },
        (err) => {
          this.users = [];
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
    this.users = event.units;
    this.nextPage = event.nextPage;
    this.previusPage = event.previusPage;
    this.totalPages = event.totalPages;
  }

  searcMaterial(){
    if (this.search !== ''){
      this._userService.findById(this.search)
        .subscribe(
          (res) => {
            let data = res.json();
            this.users = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.users = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }else{
      this._userService.list()
        .subscribe(
          (res) => {
            let data = res.json();
            this.users = data;
            this.nextPage = data.next;
            this.previusPage = data.previous;
            this.totalPages = data.count;
          },
          (err) => {
            this.users = [];
            this.nextPage = '';
            this.previusPage = '';
            this.totalPages = 0;
          }
        );
    }
  }

  changeStatus(process: any){
    if (process.id){
      this._userService.changeStatus(process.id)
        .subscribe(
          (res: any) => {
            let data = res.json();
            this.getUsers();
            this._toast.success(`El estado del usuario ${data.first_name} ${data.last_name} fue cambiado`, 'Usuarios!');
          },
          (err) => {
            let data = err.json();
            this._toast.error(data.message, 'Usuarios!');
          }
        );
    }
  }

}
