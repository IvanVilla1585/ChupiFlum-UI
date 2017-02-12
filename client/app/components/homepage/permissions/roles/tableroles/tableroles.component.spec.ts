/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablerolesComponent } from './tableroles.component';

describe('TablerolesComponent', () => {
  let component: TablerolesComponent;
  let fixture: ComponentFixture<TablerolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablerolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablerolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
