import { Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';
import { RawmaterialComponent } from './rawmaterial/rawmaterial/rawmaterial.component';

export const routesShopping = {
  path: 'compras',
  component: ShoppingComponent,
  children: [
    {
      path: 'proveedores',
      component: SupplierComponent
    },
    {
      path: 'materiaprima',
      component: RawmaterialComponent
    }
  ]
};

export const routesShoppingComponents = [
  ShoppingComponent,
  SupplierComponent,
  RawmaterialComponent
];
