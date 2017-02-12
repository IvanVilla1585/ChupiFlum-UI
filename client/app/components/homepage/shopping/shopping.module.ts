import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';

@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule
  ],
  declarations: [ShoppingComponent]
})
export class ShoppingModule { }
