import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablemachinesRoutingModule } from './tablemachines-routing.module';
import { TablemachinesComponent } from './tablemachines.component';
import {MatSlideToggle} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TablemachinesRoutingModule
  ],
  declarations: [TablemachinesComponent, MatSlideToggle]
})
export class TablemachinesModule { }
