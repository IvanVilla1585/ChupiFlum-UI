/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableprocessComponent } from './tableprocess.component';

describe('TableprocessComponent', () => {
  let component: TableprocessComponent;
  let fixture: ComponentFixture<TableprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
