import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Course } from '@skooltrak-app/models';
import { ConfirmationService, FullNamePipe } from '@skooltrak-app/ui';
import { filter, Subject, takeUntil } from 'rxjs';

import { CoursesFormComponent } from '../courses-form/courses-form.component';
import { CoursesStore } from '../courses.store';

@Component({
  selector: 'skooltrak-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    FullNamePipe,
  ],
  providers: [ConfirmationService],
  template: `
    <mat-card>
      <mat-card-content>
        <div class="header-container">
          <mat-card-title>{{ 'Courses' | translate }}</mat-card-title>
          <button mat-flat-button color="primary" (click)="createCourse()">
            {{ 'New course' | translate }}
          </button>
        </div>
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="plan">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Plan' | translate }}
            </th>
            <td mat-cell *matCellDef="let course">{{ course.plan.name }}</td>
          </ng-container>
          <ng-container matColumnDef="subject">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Subject' | translate }}
            </th>
            <td mat-cell *matCellDef="let course">{{ course.subject.name }}</td>
          </ng-container>
          <ng-container matColumnDef="teachers">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Teachers' | translate }}
            </th>
            <td mat-cell *matCellDef="let course">
              <mat-chip-listbox>
                <mat-chip
                  *ngFor="let teacher of course.teachers"
                  color="primary"
                  selected
                  >{{ teacher | fullName: 'short' }}</mat-chip
                >
              </mat-chip-listbox>
            </td>
          </ng-container>
          <ng-container matColumnDef="createdAt">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Created at' | translate }}
            </th>
            <td mat-cell *matCellDef="let course">
              {{ course.createdAt | date: 'short' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="updatedAt">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Updated at' | translate }}
            </th>
            <td mat-cell *matCellDef="let course">
              {{ course.updatedAt | date: 'short' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Actions' | translate }}
            </th>
            <td mat-cell *matCellDef="let item">
              <a
                mat-icon-button
                color="primary"
                routerLink="details"
                [queryParams]="{ id: item._id }"
              >
                <mat-icon>visibility</mat-icon>
              </a>
              <button mat-icon-button color="accent" (click)="editCourse(item)">
                <mat-icon>edit</mat-icon>
              </button>
              <button
                mat-icon-button
                color="warn"
                (click)="deleteCourse(item._id)"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="[
              'plan',
              'subject',
              'teachers',
              'createdAt',
              'updatedAt',
              'actions'
            ]"
          ></tr>
          <tr
            mat-row
            *matRowDef="
              let row;
              columns: [
                'plan',
                'subject',
                'teachers',
                'createdAt',
                'updatedAt',
                'actions'
              ]
            "
          ></tr>
        </table>
        <mat-paginator
          [pageSizeOptions]="[5, 10, 20]"
          showFirstLastButtons
        />
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Course>();
  private destroy$: Subject<void> = new Subject();
  private state = inject(CoursesStore);
  private dialog = inject(MatDialog);
  private confirmation = inject(ConfirmationService);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.state.courses$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  createCourse(): void {
    const dialogRef = this.dialog.open(CoursesFormComponent, {
      panelClass: ['dialog', 'small'],
    });
    dialogRef
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (request: Course) => {
          !!request && this.state.createCourse(request);
        },
      });
  }

  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(CoursesFormComponent, {
      panelClass: ['dialog', 'small'],
      data: course,
    });

    dialogRef
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (request) => {
          !!request && this.state.patchCourse({ id: course._id, request });
        },
      });
  }

  deleteCourse(id: string): void {
    this.confirmation
      .openDialog('delete')
      .pipe(
        takeUntil(this.destroy$),
        filter((value) => value)
      )
      .subscribe({ next: () => this.state.deleteCourse(id) });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
