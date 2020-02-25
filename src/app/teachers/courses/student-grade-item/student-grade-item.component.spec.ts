import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeItemComponent } from './student-grade-item.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { StudentsMock } from 'src/app/shared/mocks/student.mock';
import { FormGroup, FormControl } from '@angular/forms';

describe('StudentGradeItemComponent', () => {
  let component: StudentGradeItemComponent;
  let fixture: ComponentFixture<StudentGradeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoTestingModule ],
      declarations: [ StudentGradeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGradeItemComponent);
    component = fixture.componentInstance;
    component.student = new FormGroup({
      title: new FormControl(),
      input: new FormControl(),
      comments: new FormControl(),
      student: new FormControl(),
      inputValue: new FormControl(),
      inputPlaceholder: new FormControl(),
      inputAttributes: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
