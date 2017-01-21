import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component'

const routes: Routes = [
  {
    path: 'menu',
    component: HomepageComponent
  }
];

export const routesComponents = [
  HomepageComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomepageRoutingModule { }
