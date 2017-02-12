import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { MachineComponent } from './machine/machine/machine.component';
import { TablemachinesComponent } from './machine/tablemachines/tablemachines.component';
import  { UnitmeasureComponent } from './unitmeasure/unitmeasure/unitmeasure.component';
import  { TableunitmeasureComponent } from './unitmeasure/tableunitmeasure/tableunitmeasure.component';

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
    }
  ]
};

export const routesProuctionComponents = [
  ProductionComponent,
  MachineComponent,
  UnitmeasureComponent,
  TablemachinesComponent,
  TableunitmeasureComponent
];

