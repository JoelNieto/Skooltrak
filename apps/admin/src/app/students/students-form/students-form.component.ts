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
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import {
  ClassGroup,
  Degree,
  Gender,
  School,
  Student,
  StudyPlan,
} from '@skooltrak-app/models';
import { admin_students } from '@skooltrak-app/state';
import { ImageCropperComponent } from '@skooltrak-app/ui';
import { NgxSpinnerModule } from 'ngx-spinner';
import { combineLatest, filter, map, of, Subscription, switchMap } from 'rxjs';

import { ParentsFormComponent } from '../parents-form/parents-form.component';

@Component({
  selector: 'skooltrak-students-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    ParentsFormComponent,
    ImageCropperComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
})
export class StudentsFormComponent implements OnInit, OnDestroy {
  @Output() saveStudent = new EventEmitter<Partial<Student>>();

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
    birthDate: new FormControl<Date | undefined>(undefined, {
      nonNullable: true,
    }),
    school: new FormControl<School | undefined>(undefined, {
      nonNullable: true,
    }),
    degree: new FormControl<Degree | undefined>(undefined, {
      nonNullable: true,
    }),
    plan: new FormControl<StudyPlan | undefined>(undefined, {
      nonNullable: true,
    }),
    group: new FormControl<ClassGroup | undefined>(undefined, {
      nonNullable: true,
    }),
    address: new FormControl('', { nonNullable: true }),
    father: new FormGroup({
      name: new FormControl('', { nonNullable: true }),
      address: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      relation: new FormControl('', { nonNullable: true }),
      documentId: new FormControl('', { nonNullable: true }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      mobileNumber: new FormControl('', { nonNullable: true }),
      nationality: new FormControl('Panama', { nonNullable: true }),
    }),
    mother: new FormGroup({
      name: new FormControl('', { nonNullable: true }),
      relation: new FormControl('', { nonNullable: true }),
      address: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      documentId: new FormControl('', { nonNullable: true }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      mobileNumber: new FormControl('', { nonNullable: true }),
      nationality: new FormControl('Panama', { nonNullable: true }),
    }),
    profilePicURL: new FormGroup<string>(''),
    medicalInfo: new FormGroup({
      bloodGroup: new FormControl('', { nonNullable: true }),
      allergies: new FormControl('', { nonNullable: true }),
      medicine: new FormControl('', { nonNullable: true }),
      pediatrician: new FormControl('', { nonNullable: true }),
      hospital: new FormControl('', { nonNullable: true }),
    }),
  });
  genderEnum = Gender;
  groups$ = this.state.allGroups$;
  schools$ = this.state.allSchools$;
  degrees$ = this.state.allDegrees$;
  plans$ = this.state.allPlans$;
  student$ = this.state.selectedStudent$;
  bloodGroups: string[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  subscription = new Subscription();
  newPicture: File;
  currentPicture: any =
    'https://skooltrak-files.fra1.digitaloceanspaces.com/avatars/93bb9a2f-fd89-4793-9af0-0afffcccdb7a-default-avatar.png';

  constructor(
    private state: admin_students.StudentsFacade,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.subscription.add(
      this.student$.subscribe({
        next: (student) => {
          this.form.patchValue(student);
          this.currentPicture = student?.profilePicURL ?? this.currentPicture;
          if (!student) {
            this.degrees$ = combineLatest([
              this.form.get('school')?.valueChanges,
              this.degrees$,
            ]).pipe(
              filter(([, degrees]) => degrees.length > 0),
              map(([school, degrees]) =>
                degrees.filter((x) => x.school._id === school?._id)
              )
            );

            this.plans$ = combineLatest([
              this.form.get('degree')?.valueChanges,
              this.plans$,
            ]).pipe(
              map(([degree, plans]) =>
                plans.filter((x) => x.degree._id === degree?._id)
              )
            );

            this.groups$ = combineLatest([
              this.form.get('plan')?.valueChanges,
              this.groups$,
            ]).pipe(
              map(([plan, groups]) =>
                groups.filter((x) => x.plan._id === plan?._id)
              )
            );
          }
        },
      })
    );
  }

  saveChanges() {
    const value = this.form.getRawValue();
    if (this.newPicture) {
      this.subscription.add(
        this.state
          .changePicture(this.newPicture)
          .pipe(switchMap(({ url }) => of({ ...value, profilePicURL: url })))
          .subscribe({ next: (student) => this.saveStudent.emit(student) })
      );
    } else {
      this.saveStudent.emit(value);
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

  selectSchool(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
