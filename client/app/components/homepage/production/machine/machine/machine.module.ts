import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineRoutingModule } from './machine-routing.module';
import { MachineComponent } from './machine.component';

@NgModule({
  imports: [
    CommonModule,
    MachineRoutingModule
  ],
  declarations: [MachineComponent]
})
export class MachineModule { }
