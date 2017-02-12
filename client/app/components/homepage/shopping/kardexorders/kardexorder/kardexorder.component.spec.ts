/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KardexorderComponent } from './kardexorder.component';

describe('KardexorderComponent', () => {
  let component: KardexorderComponent;
  let fixture: ComponentFixture<KardexorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KardexorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
