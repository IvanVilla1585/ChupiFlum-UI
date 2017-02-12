import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageModule } from './components/homepage/homepage.module'
import {LoginModule} from "./components/login/login.module";
import {RolesService} from "./services/roles/roles.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    LoginModule,
    HomepageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
