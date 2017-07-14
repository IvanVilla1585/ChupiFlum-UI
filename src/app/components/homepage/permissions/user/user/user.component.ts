import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../../../services/permissions/user.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  public userForm: FormGroup;
  public roles: any[];

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager
  )
  {
    this.roles = [];
    this._toast.setRootViewContainerRef(_container)
  }

  ngOnInit() {
    this.createForm();
    this.getGroups();
  }

  getGroups(){
    this._userService.getGroups()
      .subscribe(
        res => {
          let data = res.json();
          this.roles = data;
        },
        err => {
          this._toast.error('Ocurrio un error en el servidor', 'Usuarios!');
          this.roles = [];
        }
      );
  }

  createForm() {
    this.userForm = this.fb.group({ // <-- the parent FormGroup
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  save(){
    debugger
    if (this.userForm.status === 'VALID'){
      let data = {
        first_name: this.userForm.get('first_name').value,
        last_name: this.userForm.get('last_name').value,
        email: this.userForm.get('email').value,
        groups: [parseInt(this.userForm.get('group').value)],
        username: `${this.userForm.get('first_name').value}${this.userForm.get('last_name').value}`,
        is_active: false
      }
      this._userService.save(data)
        .subscribe(
          res => {
            let data = res.json();
            this.userForm.reset({group: ""});
            this._toast.success(`Se creo el usuario ${data.first_name}, se envio un correo para terminar el registro`, 'Usuarios!')
          },
          err => {
            let message = '';
            if (err.message)
              message = err.message;
            else
              message = 'Ocurrio un error en el servidor';
            this._toast.error(message, 'Usuarios!')
          }
        );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Usuarios!')
    }
  }

}
