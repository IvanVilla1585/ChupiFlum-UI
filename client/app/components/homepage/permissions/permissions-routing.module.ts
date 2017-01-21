import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsComponent } from './permissions.component';
import { RolesComponent } from './roles/roles.component'

const routes: Routes = [
  {
    path: 'roles',
    component: RolesComponent
  }
];

export const routesPermissionsComponents = [
  RolesComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PermissionsRoutingModule { }
