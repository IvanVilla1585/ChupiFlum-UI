import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { UnitmeasureComponent } from './unitmeasure/unitmeasure/unitmeasure.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductionComponent, UnitmeasureComponent]
})
export class ProductionModule { }
