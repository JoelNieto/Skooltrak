import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlansListComponent } from './study-plans-list.component';

describe('StudyPlansListComponent', () => {
  let component: StudyPlansListComponent;
  let fixture: ComponentFixture<StudyPlansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StudyPlansListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyPlansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
