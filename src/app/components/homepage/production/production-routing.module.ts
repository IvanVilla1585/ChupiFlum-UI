import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { MachineComponent } from './machine/machine/machine.component';
import { TablemachinesComponent } from './machine/tablemachines/tablemachines.component';
import  { UnitmeasureComponent } from './unitmeasure/unitmeasure/unitmeasure.component';
import  { TableunitmeasureComponent } from './unitmeasure/tableunitmeasure/tableunitmeasure.component';
import { ProductComponent } from './products/product/product.component';
import { TableproductsComponent } from './products/tableproducts/tableproducts.component';
import { ProcessComponent } from './process/process/process.component';
import { TableprocessComponent } from './process/tableprocess/tableprocess.component';

export const routesProduction = {
  path: 'produccion',
  component: ProductionComponent,
  children: [
    {
      path: 'maquinas',
      component: MachineComponent
    },
    {
      path: 'tablamaquinas',
      component: TablemachinesComponent
    },
    {
      path: 'unidadmedidas',
      component: UnitmeasureComponent
    },
    {
      path: 'tablaunidadmedidas',
      component: TableunitmeasureComponent
    },
    {
      path: 'productoterminado',
      component: ProductComponent
    },
    {
      path: 'tablaproductosterminados',
      component: TableproductsComponent
    },
    {
      path: 'procesos',
      component: ProcessComponent
    },
    {
      path: 'tablaprocesos',
      component: TableprocessComponent
    }
  ]
};

export const routesProuctionComponents = [
  ProductionComponent,
  MachineComponent,
  UnitmeasureComponent,
  TablemachinesComponent,
  TableunitmeasureComponent,
  ProductComponent,
  TableproductsComponent,
  ProcessComponent,
  TableprocessComponent
];

