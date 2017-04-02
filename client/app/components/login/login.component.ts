import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ShowFeedback } from '../../libs/showFeedback';
import {User} from "./user";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.styl'],
  providers: [AuthService, ShowFeedback]
})
export class LoginComponent implements OnInit {

  public user : any;

  public username: string;
  public password: string;

  constructor(private authService: AuthService, private showFeedback: ShowFeedback, private _router: Router) {
  }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  sigIn(event){
    event.preventDefault();
    let user = {
      username: this.username,
      password: this.password
    };
    this.authService.login(user)
      .subscribe(
        json => {
          if (json.status === 200) {
            this.user = json.user;
            this.authService.storeCookie(this.user);
            this._router.navigate(['/menu']);
          }else{
            this.showFeedback.createMessage(json.message);
          }
        },
        err => {
          this.user = {};
        });
  }

}
