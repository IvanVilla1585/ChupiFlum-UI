import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableproductsRoutingModule } from './tableproducts-routing.module';
import { TableproductsComponent } from './tableproducts.component';
import {MatSlideToggle} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TableproductsRoutingModule
  ],
  declarations: [TableproductsComponent, MatSlideToggle]
})
export class TableproductsModule { }
