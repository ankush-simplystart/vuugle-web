import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericValidatorComponent } from './generic-validator.component';

describe('GenericValidatorComponent', () => {
  let component: GenericValidatorComponent;
  let fixture: ComponentFixture<GenericValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericValidatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
