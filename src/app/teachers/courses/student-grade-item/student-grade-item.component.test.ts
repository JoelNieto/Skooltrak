import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { StudentGradeItemComponent } from './student-grade-item.component';

describe('StudentGradeItemComponent', () => {
  let component: StudentGradeItemComponent;
  let fixture: ComponentFixture<StudentGradeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoTestingModule, ReactiveFormsModule, FormsModule, NgbTooltipModule ],
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
      score: new FormControl(),
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
