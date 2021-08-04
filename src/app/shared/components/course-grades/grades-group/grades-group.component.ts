import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grade, StudentGrade } from 'src/app/shared/models/grades.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'app-grades-group',
  templateUrl: './grades-group.component.html',
  styleUrls: ['./grades-group.component.sass'],
})
export class GradesGroupComponent implements OnInit {
  @Input() grade: Grade;
  @Input() form: FormGroup;
  @Input() group: ClassGroup;
  @Input() locked = false;

  selectedAll = true;
  undetermined = false;

  constructor(
    private fb: FormBuilder,
    private groupsService: ClassGroupsService,
    @Inject(DOCUMENT) document
  ) {}

  ngOnInit(): void {
    if (this.form.get('students').value.length === 0) {
      this.groupsService.getStudents(this.form.get('group').value.id).subscribe(
        (students) => {
          students.forEach((student) => {
            (this.form.get('students') as FormArray).push(
              this.initStudent(null, student)
            );
          });
        },
        (err) => {}
      );
    }
  }

  change(): void {
    this.selectedAll = !this.selectedAll;
    const check: any = document.getElementById(
      'selected-' + this.form.get('group').value.id
    );
    check.indeterminate = false;
    (this.form.get('students') as FormArray).controls.forEach((control) => {
      control.get('included').setValue(this.selectedAll);
    });
  }

  childrenChecked(): void {
    const check: any = document.getElementById(
      'selected-' + this.form.get('group').value.id
    );
    check.indeterminate = true;
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
}
