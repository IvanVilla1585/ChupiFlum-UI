import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuComponent, HeaderComponent],
  exports: [MenuComponent, HeaderComponent]
})
export class ComonModule { }
