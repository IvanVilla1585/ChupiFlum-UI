import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawmaterialRoutingModule } from './rawmaterial-routing.module';
import { RawmaterialComponent } from './rawmaterial.component';

@NgModule({
  imports: [
    CommonModule,
    RawmaterialRoutingModule
  ],
  declarations: [RawmaterialComponent]
})
export class RawmaterialModule { }
