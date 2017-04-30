/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableusersComponent } from './tableusers.component';

describe('TableusersComponent', () => {
  let component: TableusersComponent;
  let fixture: ComponentFixture<TableusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
