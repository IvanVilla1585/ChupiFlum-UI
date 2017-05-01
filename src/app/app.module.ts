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
import { PagerComponent } from './common/pager/pager.component';
import {MdDialogModule, MdSlideToggleModule} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EditUnitMeasureComponent} from "./modals/production/edit-unit-measure/edit-unit-measure.component";
import { ModalEditMachineComponent } from './modals/production/modal-edit-machine/modal-edit-machine.component';
import { ModalEditProcessComponent } from './modals/production/modal-edit-process/modal-edit-process.component';

@NgModule({
  declarations: [
    AppComponent,
    routesLoginComponents,
    routesHomeComponents,
    EditUnitMeasureComponent,
    PagerComponent,
    ModalEditMachineComponent,
    ModalEditProcessComponent,
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
    BrowserAnimationsModule,
    MdDialogModule,
    MdSlideToggleModule
  ],
  entryComponents: [
    EditUnitMeasureComponent,
    ModalEditMachineComponent,
    ModalEditProcessComponent
  ],
  providers: [CookieService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
