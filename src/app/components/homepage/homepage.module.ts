import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule, routesHomeComponents } from './homepage-routing.module';
import {MenuComponent} from "../../common/menu/menu.component";
import {HeaderComponent} from "../../common/header/header.component";
import {PermissionsModule} from "./permissions/permissions.module";
import { MachineComponent } from './production/machine/machine/machine.component';
import { TablemachinesComponent } from './production/machine/tablemachines/tablemachines.component';

@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule,
    PermissionsModule
  ],
  declarations: [routesHomeComponents, MenuComponent, HeaderComponent, MachineComponent, TablemachinesComponent],
  exports: [routesHomeComponents, MenuComponent, HeaderComponent]
})
export class HomepageModule { }
