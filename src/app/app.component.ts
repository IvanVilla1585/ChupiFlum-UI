import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  public currentUrl: string;
  public user: any;

  constructor(
    private _router: Router,
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    this.currentUrl = '';
    this.user = {};
    this.validateSessionUser();
  }

  validateSessionUser(){
    this.user = this.getCookie("chupiflum.user");

    let json = this.user ? JSON.parse(this.user) : {};

    if (!json || !this.validateDateExpiration(json)){
      this._router.navigate(['/login']);
    }
  }

  validateDateExpiration(json){
    let res = false;
    if (json.last_login) {
      let last_login = new Date(json.last_login);
      let endDate = new Date(last_login.setSeconds(json.expires_in));
      let date = new Date();
      if (date.getTime() < endDate.getTime())
        res = true
    }

    return res;
  }

  getCookie(key: string){
    return this._cookieService.get(key);
  }
}
