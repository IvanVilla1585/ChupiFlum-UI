import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableprocessRoutingModule } from './tableprocess-routing.module';
import { TableprocessComponent } from './tableprocess.component';

@NgModule({
  imports: [
    CommonModule,
    TableprocessRoutingModule
  ],
  declarations: [TableprocessComponent]
})
export class TableprocessModule { }
