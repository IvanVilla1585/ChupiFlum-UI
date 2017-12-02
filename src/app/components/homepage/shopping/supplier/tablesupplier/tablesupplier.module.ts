import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggle} from '@angular/material';
import { TableunitmeasureRoutingModule } from './tableunitmeasure-routing.module';
import { TableunitmeasureComponent } from './tableunitmeasure.component';

@NgModule({
  imports: [
    CommonModule,
    TableunitmeasureRoutingModule
  ],
  declarations: [TableunitmeasureComponent, MatSlideToggle]
})
export class TableunitmeasureModule { }
