import { Routes, RouterModule } from '@angular/router';
import { PermissionsComponent } from './permissions.component';
import { RolesComponent } from './roles/roles/roles.component';
import { TablerolesComponent } from './roles/tableroles/tableroles.component';

export const routesPermissions: Routes = [
  {
    path: 'permisos',
    component: PermissionsComponent,
    children: [
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'tablaroles',
        component: TablerolesComponent
      }
    ]
  }
];

export const routesPermissionsComponents = [
  PermissionsComponent,
  RolesComponent,
  TablerolesComponent
];
