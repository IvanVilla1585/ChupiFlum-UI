import { Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';
import { RawmaterialComponent } from './rawmaterial/rawmaterial/rawmaterial.component';
import { OrderComponent } from './orders/order/order.component';

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
    },
    {
      path: 'pedidos',
      component: OrderComponent
    }
  ]
};

export const routesShoppingComponents = [
  ShoppingComponent,
  SupplierComponent,
  RawmaterialComponent,
  OrderComponent
];
