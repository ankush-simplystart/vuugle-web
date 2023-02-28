import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVuuglesComponent } from './my-vuugles.component';

describe('MyVuuglesComponent', () => {
  let component: MyVuuglesComponent;
  let fixture: ComponentFixture<MyVuuglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVuuglesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVuuglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
