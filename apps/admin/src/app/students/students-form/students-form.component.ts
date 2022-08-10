import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { ClassGroup, Degree, Gender, StudyPlan } from '@skooltrak-app/models';
import { admin_students } from '@skooltrak-app/state';
import { combineLatest, filter, map, Subscription, tap } from 'rxjs';

import { ParentsFormComponent } from '../parents-form/parents-form.component';

@Component({
  selector: 'skooltrak-students-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    ParentsFormComponent,
  ],
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
})
export class StudentsFormComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    middleName: new FormControl('', { nonNullable: true }),
    gender: new FormControl<Gender | undefined>(Gender.Female, {
      nonNullable: true,
    }),
    surname: new FormControl('', { nonNullable: true }),
    secondSurname: new FormControl('', { nonNullable: true }),
    documentId: new FormControl('', { nonNullable: true }),
    birthDate: new FormControl<Date | null>(null, { nonNullable: true }),
    school: new FormControl(null, { nonNullable: true }),
    degree: new FormControl<Degree | null>(null, { nonNullable: true }),
    plan: new FormControl<StudyPlan | null>(null, { nonNullable: true }),
    group: new FormControl<ClassGroup | null>(null, { nonNullable: true }),
    address: new FormControl('', { nonNullable: true }),
    father: new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      relation: new FormControl(''),
      documentId: new FormControl(''),
      phoneNumber: new FormControl(''),
      mobileNumber: new FormControl(''),
      nationality: new FormControl(''),
    }),
    mother: new FormGroup({
      name: new FormControl(''),
      relation: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      documentId: new FormControl(''),
      phoneNumber: new FormControl(''),
      mobileNumber: new FormControl(''),
      nationality: new FormControl(''),
    }),

    medicalInfo: new FormGroup({
      bloodGroup: new FormControl(''),
      allergies: new FormControl(''),
      medicine: new FormControl(''),
      pediatrician: new FormControl(''),
      hospital: new FormControl(''),
    }),
  });
  genderEnum = Gender;
  groups$ = this.state.allGroups$;
  schools$ = this.state.allSchools$;
  degrees$ = this.state.allDegrees$;
  plans$ = this.state.allPlans$;
  student$ = this.state.selectedStudent$;
  bloodGroups: string[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  subscription$ = new Subscription();

  constructor(private state: admin_students.StudentsFacade) {}

  ngOnInit(): void {
    this.degrees$.subscribe({ next: (degrees) => console.log(degrees) });
    this.initForm();
  }

  initForm(): void {
    this.subscription$.add(
      this.student$.subscribe({
        next: (student) => {
          this.form.patchValue(student!);

          this.degrees$ = combineLatest([
            this.form.get('school')!.valueChanges,
            this.degrees$,
          ]).pipe(
            filter(([, degrees]) => degrees.length > 0),
            tap(([, degrees]) => console.log('Called', degrees)),
            map(([school, degrees]) =>
              degrees.filter((x) => x.school._id === school?._id)
            )
          );

          this.plans$ = combineLatest([
            this.form.get('degree')!.valueChanges,
            this.plans$,
          ]).pipe(
            tap(() => console.log('Called 2')),
            map(([degree, plans]) =>
              plans.filter((x) => x.degree._id === degree?._id)
            )
          );

          this.groups$ = combineLatest([
            this.form.get('plan')!.valueChanges,
            this.groups$,
          ]).pipe(
            tap(() => console.log('Called 3')),
            map(([plan, groups]) =>
              groups.filter((x) => x.plan._id === plan?._id)
            )
          );
        },
      })
    );
  }

  saveChanges() {
    const value = this.form.getRawValue();
    this.subscription$.add(
      this.student$.subscribe({
        next: (student) => {
          if (!student) {
            this.state.create(value);
          }
        },
      })
    );
  }

  selectSchool(): void {}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
