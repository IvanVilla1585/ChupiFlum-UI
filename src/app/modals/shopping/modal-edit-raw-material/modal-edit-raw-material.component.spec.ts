import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditRawMaterialComponent } from './modal-edit-raw-material.component';

describe('ModalEditRawMaterialComponent', () => {
  let component: ModalEditRawMaterialComponent;
  let fixture: ComponentFixture<ModalEditRawMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditRawMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditRawMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
