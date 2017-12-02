import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggle} from '@angular/material';
import { TableorderComponent } from './tableorder.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableorderComponent, MatSlideToggle]
})
export class TableorderModule { }
