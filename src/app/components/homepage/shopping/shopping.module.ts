import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';
import { TablesupplierComponent } from './supplier/tablesupplier/tablesupplier.component';
import { OrderComponent } from './orders/order/order.component';
import { TableorderComponent } from './orders/tableorder/tableorder.component';
import { KardexorderComponent } from './kardexorders/kardexorder/kardexorder.component';
import { TablekardexorderComponent } from './kardexorders/tablekardexorder/tablekardexorder.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SupplierComponent, TablesupplierComponent, OrderComponent, TableorderComponent, KardexorderComponent, TablekardexorderComponent]
})
export class ShoppingModule { }
