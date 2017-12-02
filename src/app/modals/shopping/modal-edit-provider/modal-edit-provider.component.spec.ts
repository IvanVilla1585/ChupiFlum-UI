import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProviderComponent } from './modal-edit-provider.component';

describe('ModalEditProviderComponent', () => {
  let component: ModalEditProviderComponent;
  let fixture: ComponentFixture<ModalEditProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
