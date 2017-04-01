/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablesupplierComponent } from './tablesupplier.component';

describe('TablesupplierComponent', () => {
  let component: TablesupplierComponent;
  let fixture: ComponentFixture<TablesupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
