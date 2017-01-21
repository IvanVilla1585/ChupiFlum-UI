import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule, routesComponents } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';

@NgModule({
  imports: [
    CommonModule,
    PermissionsRoutingModule
  ],
  declarations: [routesComponents],
  exports: [routesComponents]
})
export class PermissionsModule { }
