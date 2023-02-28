import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOptionComponent } from './sign-in-option.component';

describe('SignInOptionComponent', () => {
  let component: SignInOptionComponent;
  let fixture: ComponentFixture<SignInOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
