import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { routesPermissions, routesPermissionsComponents } from './permissions/permissions-routing.module';
import {routesShopping, routesShoppingComponents} from "./shopping/shopping-routing.module";

const routes: Routes = [
  {
    path: 'menu',
    component: HomepageComponent,
    children: [
      routesPermissions,
      routesShopping
    ]
  }
];

export const routesComponents = [
  HomepageComponent,
  routesPermissionsComponents,
  routesShoppingComponents
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomepageRoutingModule { }
