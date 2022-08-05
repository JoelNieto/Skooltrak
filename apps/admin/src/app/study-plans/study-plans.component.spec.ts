import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlansComponent } from './study-plans.component';

describe('StudyPlansComponent', () => {
  let component: StudyPlansComponent;
  let fixture: ComponentFixture<StudyPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StudyPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
