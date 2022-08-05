import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Grade, StudentGrade } from 'src/app/shared/models/grades.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'skooltrak-grades-group',
  templateUrl: './grades-group.component.html',
  styleUrls: ['./grades-group.component.sass'],
})
export class GradesGroupComponent implements OnInit {
  @Input() grade: Grade;
  @Input() form: UntypedFormGroup;
  @Input() group: ClassGroup;
  @Input() locked = false;

  selectedAll = true;
  undetermined = false;

  constructor(
    private fb: UntypedFormBuilder,
    private groupsService: ClassGroupsService,
    @Inject(DOCUMENT) document
  ) {}

  ngOnInit(): void {
    if (this.form.get('students').value.length === 0) {
      this.groupsService
        .getStudents(this.form.get('group').value.id)
        .subscribe({
          next: (students) => {
            students.forEach((student) => {
              (this.form.get('students') as UntypedFormArray).push(
                this.initStudent(null, student)
              );
            });
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  change(): void {
    this.selectedAll = !this.selectedAll;
    const check: any = document.getElementById(
      'selected-' + this.form.get('group').value.id
    );
    check.indeterminate = false;
    (this.form.get('students') as UntypedFormArray).controls.forEach((control) => {
      control.get('included').setValue(this.selectedAll);
    });
  }

  childrenChecked(): void {
    const check: any = document.getElementById(
      'selected-' + this.form.get('group').value.id
    );
    check.indeterminate = true;
  }

  private initStudent(grade?: StudentGrade, student?: Student): UntypedFormGroup {
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
}
