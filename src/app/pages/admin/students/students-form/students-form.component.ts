import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Gender, MedicalInfo, Parent, Student } from 'src/app/shared/models/students.model';
import { ClassGroup, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import { DocumentIdValidator } from 'src/app/shared/validators/document.validator';

@Component({
  selector: 'skooltrak-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.sass'],
})
export class StudentsFormComponent implements OnInit {
  @Input() student: Student;
  @Output() save = new EventEmitter();
  studentForm: FormGroup;
  groups$: Observable<ClassGroup[]>;
  genders: Gender[] = [
    { id: 1, name: 'Femenino' },
    { id: 2, name: 'Masculino' },
  ];

  plans$: Observable<StudyPlan[]>;

  minDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31,
  };

  constructor(
    private readonly fb: FormBuilder,
    private studentsService: StudentsService,
    private plansService: StudyPlanService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  getGroups(plan: StudyPlan): void {
    this.groups$ = this.plansService.getGroups(plan.id);
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      id: [this.student ? this.student.id : ''],
      firstName: [
        this.student ? this.student.firstName : '',
        [Validators.required],
      ],
      middleName: [this.student ? this.student.middleName : ''],
      surname: [
        this.student ? this.student.surname : '',
        [Validators.required],
      ],
      father: this.student
        ? this.initParent(this.student.father)
        : this.initParent(),
      mother: this.student
        ? this.initParent(this.student.mother)
        : this.initParent(),
      secondSurname: [this.student ? this.student.secondSurname : ''],
      birthDate: [this.student ? this.student.birthDate : null],
      documentId: [
        this.student ? this.student.documentId : '',
        [Validators.required],
        DocumentIdValidator.createValidator(
          this.studentsService,
          this.student ? this.student.id : null
        ),
      ],
      active: [this.student ? this.student.active : false],
      plan: [this.student ? this.student.plan : ''],
      address: [this.student ? this.student.address : ''],
      medicalInfo: this.student
        ? this.initMedicalInfo(this.student.medicalInfo)
        : this.initMedicalInfo(),
      group: [this.student ? this.student.group : ''],
      gender: [this.student ? this.student.gender : ''],
      guardians: this.student
        ? this.fb.array(this.initExistingGuardian())
        : this.fb.array([this.initGuardian()]),
    });
    this.plans$ = this.plansService.getAll();
    if (!this.student) {
      this.studentForm.controls.group.setValue(undefined);
      this.studentForm.controls.plan.setValue(undefined);
      this.studentForm.controls.gender.setValue(undefined);
    } else {
      if (this.student.plan) {
        this.getGroups(this.student.plan);
      }
      this.studentForm.controls.group.setValue(this.student.group);
      this.studentForm.controls.gender.setValue(this.student.gender);
    }
  }

  initGuardian(guardian?: Parent): FormGroup {
    return this.fb.group({
      name: [guardian ? guardian.name : '', [Validators.required]],
      relation: [guardian ? guardian.relation : ''],
      phoneNumber: [guardian ? guardian.phoneNumber : ''],
      mobileNumber: [guardian ? guardian.mobileNumber : ''],
      email: [guardian ? guardian.email : ''],
    });
  }

  initMedicalInfo(info?: MedicalInfo): FormGroup {
    return this.fb.group({
      bloodGroup: [info ? info.bloodGroup : ''],
      allergies: [info ? info.allergies : ''],
      medicine: [info ? info.medicine : ''],
      pediatrician: [info ? info.pediatrician : ''],
      hospital: [info ? info.hospital : ''],
    });
  }

  initParent(parent?: Parent): FormGroup {
    return this.fb.group({
      name: [parent ? parent.name : ''],
      relation: [parent ? parent.relation : ''],
      nationality: [parent ? parent.nationality : ''],
      documentId: [parent ? parent.documentId : ''],
      phoneNumber: [parent ? parent.phoneNumber : ''],
      mobileNumber: [parent ? parent.mobileNumber : ''],
      email: [parent ? parent.email : ''],
      address: [parent ? parent.address : ''],
      workAddress: [parent ? parent.workAddress : ''],
    });
  }

  getChildForm(key: string): FormGroup {
    return this.studentForm.get(key) as FormGroup;
  }

  initExistingGuardian(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.student.guardians.forEach((guardian) => {
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

  saveStudents(): void {
    this.save.emit(this.studentForm.value);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
