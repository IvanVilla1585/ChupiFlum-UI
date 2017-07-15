import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {UserService} from "../../../services/permissions/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-password-create',
  templateUrl: './user-password-create.component.html',
  styleUrls: ['./user-password-create.component.styl'],
  providers: [UserService]
})
export class UserPasswordCreateComponent implements OnInit {

  userPasswordForm: FormGroup;
  token: string;
  id: string;

  constructor(
    private fb: FormBuilder,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _userService: UserService,
    private _route: ActivatedRoute
  )
  {
    this.token = '';
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.token = this._route.params["_value"]["token"];
    this.getId();
  }

  createForm(){
    this.userPasswordForm = this.fb.group({ // <-- the parent FormGroup
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  getId(){
    debugger
    this._userService.getId(this.token)
      .subscribe(
        res => {
          let data = res.json();
          this.id = data.id;
        },
        err => {
          this._toast.error('Ocurrio un error obteniendo el id', 'Usuarios');
        }
      );
  }

  save(){
    if (this.userPasswordForm.status === 'VALID') {
      let data = {
        id: this.id,
        username: this.userPasswordForm.get('username').value,
        password: this.userPasswordForm.get('password').value,
        is_active: true
      };
      this._userService.activeAccount(data)
        .subscribe(
          res => {
            let data = res.json();
          },
          err => {
            this._toast.error('Token invalido', 'Usuarios!');
          }
        );

    }else{
      this._toast.info('Todos los campos con * son obligatorios', 'Usuarios');
    }
  }

}
