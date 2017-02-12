import { Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';

export const routesShopping = {
  path: 'compras',
  component: ShoppingComponent,
  children: [
    {
      path: 'proveedores',
      component: SupplierComponent
    }
  ]
};

export const routesShoppingComponents = [
  ShoppingComponent,
  SupplierComponent
];
