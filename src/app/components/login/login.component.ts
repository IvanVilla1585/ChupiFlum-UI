import {Component, OnInit, Input, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ShowFeedback } from '../../libs/showFeedback';
import {User} from "./user";
import {ToastsManager} from "ng2-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.styl'],
  providers: [AuthService, ShowFeedback]
})
export class LoginComponent implements OnInit {

  public user : any;
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private _container: ViewContainerRef,
    private _router: Router,
    private _toast: ToastsManager,
    private fb: FormBuilder
  )
  {
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.user = {};
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({ // <-- the parent FormGroup
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  sigIn(event){
    debugger
    if (this.loginForm.status === 'VALID') {
      let data = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      };
      this.authService.login(data)
        .subscribe(
          json => {
            if (json.status === 200) {
              this.user = json.user;
              this.authService.storeCookie(this.user);
              this._router.navigate(['/menu']);
            }
          },
          err => {
            this.user = {};
            let data = err.json();
            if (data.status === 500 && data.message)
              this._toast.error(data.message, 'Login!');
            else
              this._toast.error('Disculpe, ocurrio un error', 'Login!');
          }
        );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Login!');
    }
  }

}
