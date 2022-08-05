import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsNewComponent } from './students-new.component';

describe('StudentsNewComponent', () => {
  let component: StudentsNewComponent;
  let fixture: ComponentFixture<StudentsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
