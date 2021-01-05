import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Grade, StudentsGrade } from 'src/app/shared/models/grades.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { GradesService } from 'src/app/shared/services/grades.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grades-form',
  templateUrl: './grades-form.component.html',
  styleUrls: ['./grades-form.component.sass']
})
export class GradesFormComponent implements OnInit {

  @Input() course: Course;
  @Input() grade: Grade;
  @Input() locked = false;

  minDate: NgbDateStruct = { year: new Date().getFullYear(), month: 3, day: 1 };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31,
  };

  $students: Observable<Student[]>;

  currentGroup: ClassGroup;
  gradeForm: FormGroup;
  constructor(
    public modal: NgbActiveModal,
    private courseService: CoursesService,
    private gradesService: GradesService,
    private session: SessionService,
    private translate: TranslocoService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.$students = this.courseService.getStudents(this.course.id);
    this.gradeForm = this.fb.group({
      id: [this.grade ? this.grade.id : ''],
      course: [this.course],
      title: [
        { value: this.grade ? this.grade.title : '', disabled: this.locked },
        [Validators.required],
      ],
      teacher: [
        this.grade ? this.grade.teacher : this.session.currentUser.people[0],
      ],
      date: [
        { value: this.grade ? this.grade.date : '', disabled: this.locked },
        [Validators.required],
      ],
      bucket: [
        {
          value: this.grade ? this.grade.bucket : undefined,
          disabled: this.locked,
        },
        [Validators.required],
      ],
      studentsGrades: this.grade
        ? this.fb.array(this.existingStudentsGrades())
        : this.fb.array(await this.initStudents()),
    });
  }

  async initStudents() {
    const controls: FormGroup[] = [];
    await this.$students.toPromise().then((res) => {
      res.forEach((student) => {
        controls.push(this.initStudent(null, student));
      });
    });
    return controls;
  }

  initStudent(grade?: StudentsGrade, student?: Student): FormGroup {
    return this.fb.group({
      student: [
        grade ? grade.student : { id: student.id, name: student.shortName },
        [Validators.required],
      ],
      score: [
        { value: grade ? grade.score : 1, disabled: this.locked },
        [Validators.min(1), Validators.max(5)],
      ],
      comments: [grade ? grade.comments : ''],
    });
  }

  existingStudentsGrades(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.grade.studentsGrades.forEach((student) => {
      controls.push(this.initStudent(student));
    });
    return controls;
  }

  save() {
    if (!this.grade) {
      this.gradesService.create(this.gradeForm.value).subscribe((res) => {
        Swal.fire(
          res.title,
          this.translate.translate('Created itemf', {
            value: this.translate.translate('Grade'),
          }),
          'success'
        );
        this.grade = res;
      });
    } else {
      this.gradesService
        .edit(this.grade.id, this.gradeForm.value)
        .subscribe(() => {
          Swal.fire(
            this.gradeForm.get('title').value,
            this.translate.translate('Updated itemf', {
              value: this.translate.translate('Grade'),
            }),
            'success'
          );
        });
    }
  }

  publish() {
    this.gradesService.publish(this.grade.id).subscribe(() => {
      Swal.fire(this.translate.translate('Grades published'), '', 'success');
      this.grade.published = true;
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
