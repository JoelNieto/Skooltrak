import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Gender, Parent, Student } from 'src/app/shared/models/students.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.sass']
})
export class StudentsFormComponent implements OnInit {

  @Input() student: Student;
  @Output() save = new EventEmitter();
  studentForm: FormGroup;
  groups: Observable<ClassGroup[]>;
  genders: Gender[] = [
    { id: 1, name: 'Femenino' },
    { id: 2, name: 'Masculino' }
  ];
  constructor(
    private readonly fb: FormBuilder,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: [this.student ? this.student.id : ''],
      firstName: [
        this.student ? this.student.firstName : '',
        [Validators.required]
      ],
      middleName: [this.student ? this.student.middleName : ''],
      surname: [
        this.student ? this.student.surname : '',
        [Validators.required]
      ],
      secondSurname: [this.student ? this.student.secondSurname : ''],
      birthDate: [this.student ? this.student.birthDate : null],
      documentId: [this.student ? this.student.documentId : ''],
      address: [this.student ? this.student.address : ''],
      group: [this.student ? this.student.group : ''],
      gender: [this.student ? this.student.gender : ''],
      parents: this.student
        ? this.fb.array(this.initExistingParent())
        : this.fb.array([this.initParent()])
    });

    if (!this.student) {
      this.studentForm.controls.group.setValue(undefined);
      this.studentForm.controls.gender.setValue(undefined);
    } else {
      this.studentForm.controls.group.setValue(this.student.group);
      this.studentForm.controls.gender.setValue(this.student.gender);
    }
    this.groups = this.groupsService.getAll();
  }

  initParent(parent?: Parent): FormGroup {
    return this.fb.group({
      name: [parent ? parent.name : '', [Validators.required]],
      phoneNumber: [parent ? parent.phoneNumber : ''],
      mobileNumber: [parent ? parent.mobileNumber : ''],
      email: [parent ? parent.email : '']
    });
  }

  initExistingParent(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.student.parents.forEach(parent => {
      controls.push(this.initParent(parent));
    });
    return controls;
  }

  addParent(): void {
    const controls = this.studentForm.controls.parents as FormArray;
    controls.push(this.initParent());
  }

  removeParent(i: number): void {
    const controls = this.studentForm.controls.parents as FormArray;
    controls.removeAt(i);
  }

  saveStudents() {
    this.save.emit(this.studentForm.value);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
