import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule, routesComponents } from './homepage-routing.module';
import {MenuComponent} from "../../common/menu/menu.component";
import {HeaderComponent} from "../../common/header/header.component";
import {PermissionsModule} from "./permissions/permissions.module";

@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule,
    PermissionsModule
  ],
  declarations: [routesComponents, MenuComponent, HeaderComponent],
  exports: [routesComponents, MenuComponent, HeaderComponent]
})
export class HomepageModule { }
