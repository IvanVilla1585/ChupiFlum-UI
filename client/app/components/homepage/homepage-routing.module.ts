import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component'
import { PermissionsComponent } from './permissions/permissions.component'

const routes: Routes = [
  {
    path: 'menu',
    component: HomepageComponent,
    children: [
      {
        path: 'permissions',
        component: PermissionsComponent
      }
    ]
  }
];

export const routesComponents = [
  HomepageComponent,
  PermissionsComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomepageRoutingModule { }
