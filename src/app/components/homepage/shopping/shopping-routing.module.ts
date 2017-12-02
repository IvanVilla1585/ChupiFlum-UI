import { Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';
import { RawmaterialComponent } from './rawmaterial/rawmaterial/rawmaterial.component';
import { OrderComponent } from './orders/order/order.component';
import { KardexorderComponent } from './kardexorders/kardexorder/kardexorder.component';
import {TablerawmaterialComponent} from "./rawmaterial/tablerawmaterial/tablerawmaterial.component";
import {TablesupplierComponent} from "./supplier/tablesupplier/tablesupplier.component";
import {TableorderComponent} from './orders/tableorder/tableorder.component';

export const routesShopping = {
  path: 'compras',
  component: ShoppingComponent,
  children: [
    {
      path: 'proveedores',
      component: SupplierComponent
    },
    {
      path: 'tablaproveedores',
      component: TablesupplierComponent
    },
    {
      path: 'materiaprima',
      component: RawmaterialComponent
    },
    {
      path: 'tablamateriaprima',
      component: TablerawmaterialComponent
    },
    {
      path: 'pedidos',
      component: OrderComponent
    },
    {
      path: 'tablapedidos',
      component: TableorderComponent
    },
    {
      path: 'entradamateriaprima',
      component: KardexorderComponent
    }
  ]
};

export const routesShoppingComponents = [
  ShoppingComponent,
  SupplierComponent,
  RawmaterialComponent,
  OrderComponent,
  KardexorderComponent,
  TablerawmaterialComponent,
  TablesupplierComponent,
  TableorderComponent
];
