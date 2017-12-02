import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableprocessRoutingModule } from './tableprocess-routing.module';
import { TableprocessComponent } from './tableprocess.component';
import {MatSlideToggle} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TableprocessRoutingModule
  ],
  declarations: [TableprocessComponent, MatSlideToggle]
})
export class TableprocessModule { }
