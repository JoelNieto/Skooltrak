import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import {
  ClassGroup,
  Course,
  Grade,
  Period,
  Student,
} from '@skooltrak-app/models';

import { Subject, takeUntil } from 'rxjs';
import { StudentNamePipe } from '../../pipes';
import { GradesFormComponent } from '../grades-form/grades-form.component';
import { StudentGradeComponent } from '../student-grade/student-grade.component';
import { GradesPageService } from './grades-page.service';
import { GradesPageStore } from './grades-page.store';

@Component({
  selector: 'skooltrak-grades-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    StudentNamePipe,
    MatInputModule,
    MatDialogModule,
    NgOptimizedImage,
    MatMenuModule,
    ReactiveFormsModule,
    TranslateModule,
    GradesFormComponent,
    StudentGradeComponent,
  ],
  styles: [
    `
      .avatar {
        background-size: cover;
      }

      .table-container {
        overflow: auto;
      }

      td {
        z-index: -1;
      }

      td.mat-cell {
        min-width: 150px;
      }

      td.mat-column-student {
        min-width: 230px;
        z-index: 2 !important;
      }

      th.mat-header-cell {
        .title {
          word-break: break-all;
          display: block;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'Grades' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="row">
          <mat-form-field class="col-md-4">
            <mat-label>{{ 'Course' | translate }}</mat-label>
            <mat-select [formControl]="course">
              <mat-option
                *ngFor="let course of courses$ | async"
                [value]="course"
              >
                {{ course.plan.name }} | {{ course.subject.shortName }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field class="col-md-4">
            <mat-label>{{ 'Group' | translate }}</mat-label>
            <mat-select [formControl]="group">
              <mat-option *ngFor="let group of groups$ | async" [value]="group">
                {{ group.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field class="col-md-4">
            <mat-label>{{ 'Period' | translate }}</mat-label>
            <mat-select [formControl]="period">
              <mat-option
                *ngFor="let period of periods$ | async"
                [value]="period"
              >
                {{ period.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <ng-container *ngIf="!!(selectedGroup$ | async) && period.value">
          <div class="d-flex align-items-center justify-content-between">
            <h5>{{ 'Students' | translate }}</h5>
            <button mat-flat-button color="primary" (click)="addGrade()">
              {{ 'Add grade' | translate }}
            </button>
          </div>
          <div class="table-container">
            <table mat-table [dataSource]="dataSource" matSort>
              <ng-container matColumnDef="student" sticky>
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  {{ 'Student' | translate }}
                </th>
                <td
                  mat-cell
                  class="d-flex align-items-center"
                  *matCellDef="let student"
                >
                  <div
                    mat-card-avatar
                    class="avatar my-2 me-2"
                    [style.background-image]="
                      'url(' + student.profilePicURL + ')'
                    "
                  ></div>
                  {{ student | studentName: 'short' }}
                </td>
              </ng-container>
              <ng-container
                *ngFor="let grade of grades$ | async"
                matColumnDef="{{ grade._id }}"
              >
                <th mat-header-cell *matHeaderCellDef>
                  <div class="d-flex align-items-center justify-content-around">
                    <span class="title">{{ grade.title }}</span>
                    <button mat-icon-button [matMenuTriggerFor]="gradeMenu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #gradeMenu="matMenu">
                      <button mat-menu-item (click)="editGrade(grade)">
                        <mat-icon color="accent">edit</mat-icon>
                        <span>{{ 'Edit' | translate }}</span>
                      </button>
                      <button mat-menu-item>
                        <mat-icon color="warn">delete</mat-icon>
                        <span>{{ 'Delete' | translate }}</span>
                      </button>
                    </mat-menu>
                  </div>
                </th>
                <td mat-cell *matCellDef="let student">
                  <skooltrak-student-grade
                    [student]="student"
                    [grade]="grade"
                    (saveChanges)="saveChanges()"
                  ></skooltrak-student-grade>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="columns"></tr>
              <tr mat-row *matRowDef="let row; columns: columns"></tr>
            </table>
          </div>
        </ng-container>
      </mat-card-content>
    </mat-card>
  `,

  providers: [GradesPageService, provideComponentStore(GradesPageStore)],
})
export class GradesPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  dataSource = new MatTableDataSource<Student>();
  course = new FormControl<Course | null>(null, {
    validators: [Validators.required],
    nonNullable: true,
  });
  period = new FormControl<Period | undefined>(undefined);
  group = new FormControl<ClassGroup | undefined>(undefined);
  private store = inject(GradesPageStore);
  courses$ = this.store.courses$;
  groups$ = this.store.groups$;
  selectedGroup$ = this.store.selectedGroup$;
  periods$ = this.store.periods$;
  grades$ = this.store.grades$;
  scores$ = this.store.scores$;
  columns = ['student'];
  private dialog = inject(MatDialog);

  @ViewChild(MatSort) private sort!: MatSort;

  ngOnInit(): void {
    this.iniSubscriptions();
  }

  public addGrade() {
    const dialog = this.dialog.open(GradesFormComponent, {
      panelClass: ['dialog', 'medium'],
      data: {
        course: this.course.getRawValue(),
        group: this.group.getRawValue(),
      },
    });

    dialog
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (request: Partial<Grade>) => {
          !!request && this.store.createGrade(request);
        },
      });
  }

  editGrade(grade: Grade) {
    const dialog = this.dialog.open(GradesFormComponent, {
      panelClass: ['dialog', 'medium'],
      data: {
        grade,
      },
    });

    dialog
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (request: Partial<Grade>) => {
          !!request && this.store.patchGrade({ id: grade._id, request });
        },
      });
  }

  private iniSubscriptions() {
    this.store.students$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (students) => {
        this.dataSource.data = students;
        this.dataSource.sort = this.sort;
      },
    });

    this.course.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (course) => {
        !!course && this.store.selectCourse(course);
      },
    });

    this.group.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (group) => !!group && this.store.setSelectedGroup(group),
    });

    this.period.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (period) => !!period && this.store.setSelectedPeriod(period),
    });

    this.grades$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (grades) => {
        this.columns = ['student', ...grades.map((x) => x._id)];
      },
    });
  }

  saveChanges(): void {
    this.store.reload$.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
