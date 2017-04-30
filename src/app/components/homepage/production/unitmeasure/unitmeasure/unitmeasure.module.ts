import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitmeasureRoutingModule } from './unitmeasure-routing.module';
import { UnitmeasureComponent } from './unitmeasure.component';

@NgModule({
  imports: [
    CommonModule,
    UnitmeasureRoutingModule
  ],
  declarations: [UnitmeasureComponent]
})
export class UnitmeasureModule { }
