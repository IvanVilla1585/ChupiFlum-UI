import { Routes } from '@angular/router';
import { PermissionsComponent } from './permissions.component';
import { RolesComponent } from './roles/roles/roles.component';
import { TablerolesComponent } from './roles/tableroles/tableroles.component';
import { UserComponent } from './user/user/user.component';
import { TableusersComponent } from './user/tableusers/tableusers.component';

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
      },
      {
        path: 'usuarios',
        component: UserComponent
      },
      {
        path: 'tablausuarios',
        component: TableusersComponent
      }
    ]
  }
];

export const routesPermissionsComponents = [
  PermissionsComponent,
  RolesComponent,
  TablerolesComponent,
  UserComponent,
  TableusersComponent
];
