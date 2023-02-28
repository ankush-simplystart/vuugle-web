import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuugleResultsComponent } from './vuugle-results.component';

describe('VuugleResultsComponent', () => {
  let component: VuugleResultsComponent;
  let fixture: ComponentFixture<VuugleResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuugleResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuugleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
