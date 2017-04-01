/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablemachinesComponent } from './tablemachines.component';

describe('TablemachinesComponent', () => {
  let component: TablemachinesComponent;
  let fixture: ComponentFixture<TablemachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablemachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablemachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
