import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreatorProfileComponent } from './content-creator-profile.component';

describe('ContentCreatorProfileComponent', () => {
  let component: ContentCreatorProfileComponent;
  let fixture: ComponentFixture<ContentCreatorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCreatorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCreatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
