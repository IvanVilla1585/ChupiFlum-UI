import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';
import { TablesupplierComponent } from './supplier/tablesupplier/tablesupplier.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SupplierComponent, TablesupplierComponent]
})
export class ShoppingModule { }
