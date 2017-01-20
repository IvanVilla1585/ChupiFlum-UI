import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule, routesComponents } from './homepage-routing.module';
import { PermissionsComponent } from './permissions/permissions.component';
import {MenuComponent} from "../../common/menu/menu.component";
import {HeaderComponent} from "../../common/header/header.component";

@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  declarations: [routesComponents, MenuComponent, HeaderComponent],
  exports: [routesComponents, MenuComponent, HeaderComponent]
})
export class HomepageModule { }
