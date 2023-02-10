import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Course } from '@skooltrak-app/models';
import { FullNamePipe } from '@skooltrak-app/ui';
import { Subject, takeUntil } from 'rxjs';
import { CoursesStore } from '../courses.store';

@Component({
  selector: 'skooltrak-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    TranslateModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    FullNamePipe,
  ],
  providers: [],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'Courses' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
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
            </td>
          </ng-container>

        <tr
            mat-header-row
            *matHeaderRowDef="[
              'plan',
              'subject',
              'teachers',
              'actions'
            ]"
          ></tr>
          <tr
            mat-row
            *matRowDef="
              let row;
              columns: ['plan', 'subject', 'teachers', 'actions']
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
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit, OnDestroy {
  private store = inject(CoursesStore);
  dataSource = new MatTableDataSource<Course>();
  private destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.store.courses$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (courses) => {
        this.dataSource.data = courses;
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
