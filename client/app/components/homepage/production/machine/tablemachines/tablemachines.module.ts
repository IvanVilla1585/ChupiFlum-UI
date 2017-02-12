import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablemachinesRoutingModule } from './tablemachines-routing.module';
import { TablemachinesComponent } from './tablemachines.component';

@NgModule({
  imports: [
    CommonModule,
    TablemachinesRoutingModule
  ],
  declarations: [TablemachinesComponent]
})
export class TablemachinesModule { }
