import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableproductsRoutingModule } from './tableproducts-routing.module';
import { TableproductsComponent } from './tableproducts.component';

@NgModule({
  imports: [
    CommonModule,
    TableproductsRoutingModule
  ],
  declarations: [TableproductsComponent]
})
export class TableproductsModule { }
