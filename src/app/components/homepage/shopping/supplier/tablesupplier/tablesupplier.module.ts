import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggle} from '@angular/material';
import { TablesupplierComponent } from './tablesupplier.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TablesupplierComponent, MatSlideToggle]
})
export class TablesupplierModule { }
