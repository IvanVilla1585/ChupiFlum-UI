import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerawmaterialRoutingModule } from './tablerawmaterial-routing.module';
import { TablerawmaterialComponent } from './tablerawmaterial.component';

@NgModule({
  imports: [
    CommonModule,
    TablerawmaterialRoutingModule
  ],
  declarations: [TablerawmaterialComponent]
})
export class TablerawmaterialModule { }
