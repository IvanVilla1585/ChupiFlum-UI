import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PasswordComponent} from "./password.component";
import {
  routerUserPasswordCreate,
  routesUserPasswordCreate
} from "./user-password-create/user-password-create-routing.module";

const routes: Routes = [
  {
    path: 'usuario',
    component: PasswordComponent,
    children: [
      routerUserPasswordCreate
    ]
  }
];

export const routesPasswordComponents = [
  PasswordComponent,
  routesUserPasswordCreate
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PasswordRoutingModule { }
