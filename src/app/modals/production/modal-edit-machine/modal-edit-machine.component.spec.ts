import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditMachineComponent } from './modal-edit-machine.component';

describe('ModalEditMachineComponent', () => {
  let component: ModalEditMachineComponent;
  let fixture: ComponentFixture<ModalEditMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
