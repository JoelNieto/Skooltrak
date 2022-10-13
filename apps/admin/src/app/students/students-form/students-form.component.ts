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
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
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
