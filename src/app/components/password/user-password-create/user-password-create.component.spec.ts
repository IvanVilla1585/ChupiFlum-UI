import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordCreateComponent } from './user-password-create.component';

describe('UserPasswordCreateComponent', () => {
  let component: UserPasswordCreateComponent;
  let fixture: ComponentFixture<UserPasswordCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPasswordCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPasswordCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
