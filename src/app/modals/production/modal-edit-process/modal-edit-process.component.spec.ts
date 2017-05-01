import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProcessComponent } from './modal-edit-process.component';

describe('ModalEditProcessComponent', () => {
  let component: ModalEditProcessComponent;
  let fixture: ComponentFixture<ModalEditProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
