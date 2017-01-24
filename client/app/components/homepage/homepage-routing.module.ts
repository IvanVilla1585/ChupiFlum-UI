import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { routesPermissions, routesPermissionsComponents } from './permissions/permissions-routing.module';

const routes: Routes = [
  {
    path: 'menu',
    component: HomepageComponent,
    children: routesPermissions
  }
];

export const routesComponents = [
  HomepageComponent,
  routesPermissionsComponents
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomepageRoutingModule { }
