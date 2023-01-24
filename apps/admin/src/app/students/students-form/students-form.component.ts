import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import {
  ClassGroup,
  Degree,
  Gender,
  School,
  Student,
  StudyPlan,
} from '@skooltrak-app/models';
import { ImageCropperComponent } from '@skooltrak-app/ui';
import { NgxSpinnerModule } from 'ngx-spinner';
import { of, Subscription, switchMap } from 'rxjs';

import { ParentsFormComponent } from '../parents-form/parents-form.component';
import { StudentsService } from '../students.service';
import { StudentsStore } from '../students.store';
import { StudentsFormService } from './students-form.service';
import { StudentsFormStore } from './students-form.store';

@Component({
  selector: 'skooltrak-students-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    ParentsFormComponent,
    ImageCropperComponent,
    NgxSpinnerModule,
  ],
  providers: [StudentsFormService, provideComponentStore(StudentsFormStore)],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <mat-card>
        <mat-progress-bar
          *ngIf="(saving$ | async) || savingPicture"
          mode="query"
        ></mat-progress-bar>

        <mat-card-content>
          <div class="header-container mb-3">
            <mat-card-title>{{ 'Student data' | translate }}</mat-card-title>
            <div>
              <button mat-button class="me-2" [routerLink]="'/students'">
                {{ 'Cancel' | translate }}
              </button>
              <button
                type="submit"
                mat-flat-button
                color="primary"
                [disabled]="form.invalid || form.untouched"
              >
                <mat-icon>save</mat-icon>
                {{ 'Save changes' | translate }}
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div
                class="d-flex flex-column align-items-center justify-content-center p-3 pt-0"
              >
                <img class="profile-pic" [src]="currentPicture" alt="" />
                <button
                  mat-flat-button
                  color="primary"
                  type="button"
                  (click)="cropPicture()"
                >
                  <mat-icon>file_upload</mat-icon> Change Pic
                </button>
              </div>
            </div>
            <div class="col-md-9">
              <div class="row">
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'First name' | translate }}</mat-label>
                    <input type="text" matInput formControlName="firstName" />
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Middle name' | translate }}</mat-label>
                    <input type="text" matInput formControlName="middleName" />
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Surname' | translate }}</mat-label>
                    <input type="text" matInput formControlName="surname" />
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Second surname' | translate }}</mat-label>
                    <input
                      type="text"
                      matInput
                      formControlName="secondSurname"
                    />
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Document ID' | translate }}</mat-label>
                    <input type="text" matInput formControlName="documentId" />
                    <mat-hint>X-XXX-XXXX</mat-hint>
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Gender' | translate }}</mat-label>
                    <mat-select formControlName="gender">
                      <mat-option [value]="genderEnum.Female">{{
                        genderEnum.Female | translate
                      }}</mat-option>
                      <mat-option [value]="genderEnum.Male">{{
                        genderEnum.Male | translate
                      }}</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Date of birth' | translate }}</mat-label>
                    <input
                      matInput
                      [matDatepicker]="picker"
                      formControlName="birthDate"
                    />
                    <mat-hint>MM/DD/YYYY</mat-hint>
                    <mat-datepicker-toggle
                      matSuffix
                      [for]="picker"
                    />
                    <mat-datepicker #picker />
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'School' | translate }}</mat-label>
                    <mat-select
                      formControlName="school"
                      [compareWith]="compareFn"
                    >
                      <mat-option
                        *ngFor="let school of schools$ | async"
                        [value]="school"
                        >{{ school.name }}</mat-option
                      >
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Degree' | translate }}</mat-label>
                    <mat-select
                      formControlName="degree"
                      [compareWith]="compareFn"
                    >
                      <mat-option
                        *ngFor="let degree of degrees$ | async"
                        [value]="degree"
                        >{{ degree.name }}</mat-option
                      >
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Plan' | translate }}</mat-label>
                    <mat-select
                      formControlName="plan"
                      [compareWith]="compareFn"
                    >
                      <mat-option
                        *ngFor="let plan of plans$ | async"
                        [value]="plan"
                        >{{ plan.name }}</mat-option
                      >
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="col-lg-3">
                  <mat-form-field>
                    <mat-label>{{ 'Group' | translate }}</mat-label>
                    <mat-select
                      formControlName="group"
                      [compareWith]="compareFn"
                    >
                      <mat-option
                        *ngFor="let group of groups$ | async"
                        [value]="group"
                        >{{ group.name }}</mat-option
                      >
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="col-12">
                  <mat-form-field>
                    <mat-label>{{ 'Address' | translate }}</mat-label>
                    <textarea matInput formControlName="address"></textarea>
                  </mat-form-field>
                </div>
              </div>
            </div>
          </div>
          <mat-tab-group mat-stretch-tabs="false" dynamicHeight>
            <mat-tab [label]="'Parents'">
              <div class="tab-container">
                <mat-card class="my-4">
                  <mat-card-header>
                    <mat-card-title>{{
                      'Mother info' | translate
                    }}</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <skooltrak-parents-form
                      formGroupName="mother"
                    ></skooltrak-parents-form>
                  </mat-card-content>
                </mat-card>
                <mat-card class="my-4">
                  <mat-card-header>
                    <mat-card-title>{{
                      'Father info' | translate
                    }}</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <skooltrak-parents-form
                      formGroupName="father"
                    ></skooltrak-parents-form>
                  </mat-card-content>
                </mat-card>
              </div>
            </mat-tab>
            <mat-tab [label]="'Medical info'">
              <div class="tab-container" formGroupName="medicalInfo">
                <div class="row">
                  <div class="col-md-4">
                    <mat-form-field>
                      <mat-label>{{ 'Blood group' | translate }}</mat-label>
                      <mat-select formControlName="bloodGroup">
                        <mat-option
                          *ngFor="let group of bloodGroups"
                          [value]="group"
                          >{{ group }}</mat-option
                        >
                      </mat-select>
                    </mat-form-field>
                  </div>
                  <div class="col-md-4">
                    <mat-form-field>
                      <mat-label>{{ 'Allergies' | translate }}</mat-label>
                      <input matInput type="text" formControlName="allergies" />
                    </mat-form-field>
                  </div>
                  <div class="col-md-4">
                    <mat-form-field>
                      <mat-label>{{ 'Medicine' | translate }}</mat-label>
                      <input matInput type="text" formControlName="medicine" />
                    </mat-form-field>
                  </div>
                  <div class="col-md-6">
                    <mat-form-field>
                      <mat-label>{{ 'Pediatrician' | translate }}</mat-label>
                      <input
                        matInput
                        type="text"
                        formControlName="pediatrician"
                      />
                    </mat-form-field>
                  </div>
                  <div class="col-md-6">
                    <mat-form-field>
                      <mat-label>{{ 'Hospital' | translate }}</mat-label>
                      <input matInput type="text" formControlName="hospital" />
                    </mat-form-field>
                  </div>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </form>
  `,
  styles: [
    `
      .tab-container {
        margin: 1rem;
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .profile-pic {
        width: 100%;
        border-radius: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class StudentsFormComponent implements OnInit, OnDestroy {
  @Output() saveStudent = new EventEmitter<Partial<Student>>();

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    middleName: new FormControl(''),
    gender: new FormControl<Gender>(Gender.Female),
    surname: new FormControl('', {
      validators: [Validators.required],
    }),
    secondSurname: new FormControl(''),
    documentId: new FormControl('', {
      validators: [Validators.required],
    }),
    birthDate: new FormControl<Date>(undefined, {
      validators: [Validators.required],
    }),
    school: new FormControl<School>(undefined),
    degree: new FormControl<Degree>(undefined),
    plan: new FormControl<StudyPlan>(undefined),
    group: new FormControl<ClassGroup>(undefined),
    profilePicURL: new FormControl(''),
    address: new FormControl(''),
    father: new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      relation: new FormControl(''),
      documentId: new FormControl(''),
      phoneNumber: new FormControl(''),
      mobileNumber: new FormControl(''),
      nationality: new FormControl('Panama'),
    }),
    mother: new FormGroup({
      name: new FormControl(''),
      relation: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      documentId: new FormControl(''),
      phoneNumber: new FormControl(''),
      mobileNumber: new FormControl(''),
      nationality: new FormControl('Panama'),
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
  groups$ = this.store.groups$;
  schools$ = this.store.schools$;
  degrees$ = this.store.degrees$;
  plans$ = this.store.plans$;
  bloodGroups: string[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  subscription = new Subscription();
  saving$ = this.state.loading$;
  savingPicture = false;
  newPicture: File;
  currentPicture: any =
    'https://skooltrak-files.fra1.digitaloceanspaces.com/avatars/93bb9a2f-fd89-4793-9af0-0afffcccdb7a-default-avatar.png';

  constructor(
    private state: StudentsStore,
    private store: StudentsFormStore,
    private service: StudentsService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.subscription.add(
      this.form.get('school').valueChanges.subscribe({
        next: (school) => {
          this.store.setSchool(school);
        },
      })
    );

    this.subscription.add(
      this.form.get('degree').valueChanges.subscribe({
        next: (degree) => this.store.setDegree(degree),
      })
    );

    this.subscription.add(
      this.form
        .get('plan')
        .valueChanges.subscribe({ next: (plan) => this.store.setPlan(plan) })
    );
    this.subscription.add(
      this.state.selectedStudent$.subscribe({
        next: (student) => {
          this.form.patchValue(student);
          this.currentPicture = student?.profilePicURL ?? this.currentPicture;
        },
      })
    );
  }

  saveChanges() {
    const value = this.form.getRawValue();
    if (!!this.newPicture) {
      this.savingPicture = true;
      this.subscription.add(
        this.service
          .changePicture(this.newPicture)
          .pipe(switchMap(({ url }) => of({ ...value, profilePicURL: url })))
          .subscribe({ next: (student) => this.saveStudent.emit(student) })
      );
    } else {
      this.saveStudent.emit({ ...value });
    }
  }

  cropPicture() {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      panelClass: ['dialog', 'small'],
    });

    dialogRef.afterClosed().subscribe({
      next: ({ cropImgPreview, imageFile }) => {
        if (cropImgPreview && imageFile) {
          this.currentPicture = cropImgPreview;
          this.newPicture = imageFile;
          this.cdRef.detectChanges();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
