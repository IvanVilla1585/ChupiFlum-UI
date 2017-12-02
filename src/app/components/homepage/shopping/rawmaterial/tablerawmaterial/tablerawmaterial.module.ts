import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerawmaterialRoutingModule } from './tablerawmaterial-routing.module';
import { TablerawmaterialComponent } from './tablerawmaterial.component';
import {MatSlideToggle} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TablerawmaterialRoutingModule
  ],
  declarations: [TablerawmaterialComponent, MatSlideToggle]
})
export class TablerawmaterialModule { }
