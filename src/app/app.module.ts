import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {LoginModule} from "./components/login/login.module";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpService } from './libs/HttpClient';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { LoginRoutingModule, routesLoginComponents } from './components/login/login-routing.module';
import { HomepageRoutingModule, routesHomeComponents } from './components/homepage/homepage-routing.module';
import {HomepageModule} from "./components/homepage/homepage.module";
import { PagerComponent } from './common/pager/pager.component';
import {MatDialogModule, MatSlideToggleModule, MatAutocompleteModule, MatOptionModule} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EditUnitMeasureComponent} from "./modals/production/edit-unit-measure/edit-unit-measure.component";
import { ModalEditMachineComponent } from './modals/production/modal-edit-machine/modal-edit-machine.component';
import { ModalEditProcessComponent } from './modals/production/modal-edit-process/modal-edit-process.component';
import {CustomOption} from "./libs/optionsToast";
import { ModalEditRawMaterialComponent } from './modals/shopping/modal-edit-raw-material/modal-edit-raw-material.component';
import { UserPasswordCreateComponent } from './components/password/user-password-create/user-password-create.component';
import { PasswordComponent } from './components/password/password.component';
import {routesPasswordComponents, PasswordRoutingModule} from "./components/password/password-routing.module";
import { ModalEditProviderComponent } from './modals/shopping/modal-edit-provider/modal-edit-provider.component';
import { ModalEditUserComponent } from './modals/permissions/modal-edit-user/modal-edit-user.component';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    routesLoginComponents,
    routesHomeComponents,
    routesPasswordComponents,
    EditUnitMeasureComponent,
    PagerComponent,
    ModalEditMachineComponent,
    ModalEditProcessComponent,
    ModalEditRawMaterialComponent,
    ModalEditProviderComponent,
    ModalEditUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    LoginRoutingModule,
    HomepageRoutingModule,
    PasswordRoutingModule,
    ToastModule.forRoot(),
    HomepageModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatOptionModule,
    AutoCompleteModule
  ],
  entryComponents: [
    EditUnitMeasureComponent,
    ModalEditMachineComponent,
    ModalEditProcessComponent,
    ModalEditRawMaterialComponent,
    ModalEditProviderComponent,
    ModalEditUserComponent
  ],
  providers: [
    CookieService,
    HttpService,
    {provide: ToastOptions, useClass: CustomOption},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
