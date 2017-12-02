import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggle} from '@angular/material';
import { TablerolesComponent } from './tableroles.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TablerolesComponent, MatSlideToggle]
})
export class TablerolesModule { }
