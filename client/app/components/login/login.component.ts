import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, Validators, FormGroup, NgForm} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {User} from "./user";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.styl'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public user : User;

  public username: string;
  public password: string;
  public loginForm: FormGroup;

  constructor(private authService: AuthService) {
    this.username = "Leidy";
  }

  ngOnInit() {
  }

  sigIn(event){
    event.preventDefault();
    debugger
    console.log();
    let user = {
      username: this.username,
      password: this.password
    };
    this.authService
      .loginUser(user)
      .then(res => {
        debugger
        this.user = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
