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
      mother: [this.student ? this.student.mother : null],
      father: [this.student ? this.student.father : null],
      medicalInfo: [this.student ? this.student.medicalInfo : null],
      group: [this.student ? this.student.group : ''],
      gender: [this.student ? this.student.gender : ''],
      guardians: this.student
        ? this.fb.array(this.initExistingGuardian())
        : this.fb.array([this.initGuardian()])
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

  initGuardian(guardian?: Parent): FormGroup {
    return this.fb.group({
      name: [guardian ? guardian.name : '', [Validators.required]],
      phoneNumber: [guardian ? guardian.phoneNumber : ''],
      mobileNumber: [guardian ? guardian.mobileNumber : ''],
      email: [guardian ? guardian.email : '']
    });
  }

  initExistingGuardian(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.student.guardians.forEach(guardian => {
      controls.push(this.initGuardian(guardian));
    });
    return controls;
  }

  addGuardian(): void {
    const controls = this.studentForm.controls.guardians as FormArray;
    controls.push(this.initGuardian());
  }

  removeGuardian(i: number): void {
    const controls = this.studentForm.controls.guardians as FormArray;
    controls.removeAt(i);
  }

  saveStudents() {
    this.save.emit(this.studentForm.value);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
