import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggle} from '@angular/material';
import { TableusersComponent } from './tableusers.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableusersComponent, MatSlideToggle]
})
export class TableusersModule { }
