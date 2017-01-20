import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';

@NgModule({
  imports: [
    CommonModule,
    PermissionsRoutingModule
  ],
  declarations: [PermissionsComponent]
})
export class PermissionsModule { }
