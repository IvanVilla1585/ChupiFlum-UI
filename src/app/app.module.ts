import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {LoginModule} from "./components/login/login.module";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpService } from './libs/HttpClient';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { LoginRoutingModule, routesLoginComponents } from './components/login/login-routing.module';
import { HomepageRoutingModule, routesHomeComponents } from './components/homepage/homepage-routing.module';
import {HomepageModule} from "./components/homepage/homepage.module";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ModalDeleteComponent} from "./modals/production/DeleteModal/modal-delete.component";

@NgModule({
  declarations: [
    AppComponent,
    routesLoginComponents,
    routesHomeComponents,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    LoginRoutingModule,
    HomepageRoutingModule,
    ToastModule.forRoot(),
    HomepageModule,
    Ng2Bs3ModalModule
  ],
  providers: [CookieService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
