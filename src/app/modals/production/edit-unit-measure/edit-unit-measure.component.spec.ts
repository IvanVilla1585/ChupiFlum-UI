import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnitMeasureComponent } from './edit-unit-measure.component';

describe('EditUnitMeasureComponent', () => {
  let component: EditUnitMeasureComponent;
  let fixture: ComponentFixture<EditUnitMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnitMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnitMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
