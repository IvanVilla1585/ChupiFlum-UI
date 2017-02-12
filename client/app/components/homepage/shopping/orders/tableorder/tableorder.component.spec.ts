/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableorderComponent } from './tableorder.component';

describe('TableorderComponent', () => {
  let component: TableorderComponent;
  let fixture: ComponentFixture<TableorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
