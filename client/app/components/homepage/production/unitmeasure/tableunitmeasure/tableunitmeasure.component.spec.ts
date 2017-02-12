/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableunitmeasureComponent } from './tableunitmeasure.component';

describe('TableunitmeasureComponent', () => {
  let component: TableunitmeasureComponent;
  let fixture: ComponentFixture<TableunitmeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableunitmeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableunitmeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
