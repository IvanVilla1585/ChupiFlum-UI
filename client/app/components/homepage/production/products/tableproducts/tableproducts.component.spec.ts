/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableproductsComponent } from './tableproducts.component';

describe('TableproductsComponent', () => {
  let component: TableproductsComponent;
  let fixture: ComponentFixture<TableproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
