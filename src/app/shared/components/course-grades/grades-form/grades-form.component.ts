import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Grade, GradeGroup, StudentGrade } from 'src/app/shared/models/grades.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { GradesService } from 'src/app/shared/services/grades.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grades-form',
  templateUrl: './grades-form.component.html',
  styleUrls: ['./grades-form.component.sass'],
})
export class GradesFormComponent implements OnInit {
  @Input() course: Course;
  @Input() grade: Grade;
  @Input() locked = false;
  active = 1;

  selectAll = true;
  indeterminate: boolean;

  minDate: NgbDateStruct = { year: new Date().getFullYear(), month: 3, day: 1 };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31,
  };

  groups$: Observable<ClassGroup[]>;
  gradeForm: FormGroup;
  constructor(
    public modal: NgbActiveModal,
    private courseService: CoursesService,
    private groupsService: ClassGroupsService,
    private gradesService: GradesService,
    private session: SessionService,
    private translate: TranslocoService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.groups$ = this.courseService.getGroups(this.course.id);
    this.gradeForm = this.fb.group({
      id: [this.grade ? this.grade.id : ''],
      selectedAll: [this.grade ? false : true],
      course: [this.course],
      title: [
        { value: this.grade ? this.grade.title : '', disabled: this.locked },
        [Validators.required],
      ],
      teacher: [
        this.grade ? this.grade.teacher : this.session.currentUser.people[0],
      ],
      groups: this.grade
        ? this.fb.array(this.initExistingGroups())
        : this.fb.array(await this.initGroups()),
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
    });
    console.info('form: ', this.gradeForm);
    console.info(await this.initGroups());
  }

  save(): void {
    if (!this.grade) {
      this.gradesService.create(this.gradeForm.value).subscribe(
        (res) => {
          Swal.fire(
            res.title,
            this.translate.translate('Created itemf', {
              value: this.translate.translate('Grade'),
            }),
            'success'
          );
          this.grade = res;
        },
        (err) => console.error(err)
      );
    } else {
      this.gradesService.edit(this.grade.id, this.gradeForm.value).subscribe(
        () => {
          Swal.fire(
            this.gradeForm.get('title').value,
            this.translate.translate('Updated itemf', {
              value: this.translate.translate('Grade'),
            }),
            'success'
          );
        },
        (err) => console.error(err)
      );
    }
  }

  publish(): void {
    this.gradesService.publish(this.grade.id).subscribe(
      () => {
        Swal.fire(this.translate.translate('Grades published'), '', 'success');
        this.grade.published = true;
      },
      (err) => console.error(err)
    );
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  private initStudent(grade?: StudentGrade, student?: Student): FormGroup {
    return this.fb.group({
      student: [
        grade ? grade.student : { id: student.id, name: student.shortName },
        [Validators.required],
      ],
      group: [grade ? grade.group : student.group],
      score: [
        { value: grade ? grade.score : 1, disabled: this.locked },
        [Validators.min(1), Validators.max(5)],
      ],
      included: [grade ? grade.included : true],
      comments: [grade ? grade.comments : ''],
    });
  }

  private async initGroupStudents(group: ClassGroup): Promise<FormGroup[]> {
    const controls: FormGroup[] = [];
    await this.groupsService
      .getStudents(group.id)
      .toPromise()
      .then((students) => {
        students.forEach((student) => {
          controls.push(this.initStudent(null, student));
        });
      });
    return controls;
  }

  private async initGroups(): Promise<FormGroup[]> {
    const controls: FormGroup[] = [];
    const batch = [];
    this.groups$.subscribe(
      (res) => {},
      (err) => {}
    );
    await this.groups$.toPromise().then((res) => {
      res.forEach(async (group) => {
        controls.push(await this.initGroup(null, group));
      });
    });
    return controls;
  }

  private initExistingGroups(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.grade.groups.forEach(async (group) => {
      controls.push(this.initGroup(group));
    });
    return controls;
  }

  private initGroup(gradeGroup?: GradeGroup, group?: ClassGroup): FormGroup {
    return this.fb.group({
      group: [gradeGroup ? gradeGroup.group : group],
      students: gradeGroup
        ? this.fb.array(this.existingGroupsStudents(gradeGroup.students))
        : this.fb.array([]),
    });
  }

  private existingGroupsStudents(students: StudentGrade[]): FormGroup[] {
    const controls: FormGroup[] = [];
    students.forEach((student) => {
      controls.push(this.initStudent(student));
    });
    return controls;
  }

  private existingStudentsGrades(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.grade.studentsGrades.forEach((student) => {
      controls.push(this.initStudent(student));
    });
    return controls;
  }
}
