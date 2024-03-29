import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Student } from '@skooltrak-app/models';
import { StudentsStore } from '../students.store';

@Component({
  selector: 'skooltrak-students-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    TranslateModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
  ],
  template: `
    <mat-card>
      <mat-card-content>
        <div class="header-container">
          <mat-card-title>{{ 'Students' | translate }}</mat-card-title>
          <a mat-flat-button color="primary" [routerLink]="'new'">
            {{ 'New student' | translate }}
          </a>
        </div>
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="firstName">
            <th mat-header-cell mat-sort-header *matHeaderCellDef>
              {{ 'First name' | translate }}
            </th>
            <td mat-cell *matCellDef="let student">{{ student.firstName }}</td>
          </ng-container>
          <ng-container matColumnDef="surname">
            <th mat-header-cell mat-sort-header *matHeaderCellDef>
              {{ 'Surname' | translate }}
            </th>
            <td mat-cell *matCellDef="let student">{{ student.surname }}</td>
          </ng-container>
          <ng-container matColumnDef="plan">
            <th mat-header-cell mat-sort-header *matHeaderCellDef>
              {{ 'Plan' | translate }}
            </th>
            <td mat-cell *matCellDef="let student">{{ student.plan?.name }}</td>
          </ng-container>
          <ng-container matColumnDef="group">
            <th mat-header-cell mat-sort-header *matHeaderCellDef>
              {{ 'Group' | translate }}
            </th>
            <td mat-cell *matCellDef="let student">
              {{ student.group?.name }}
            </td>
          </ng-container>
          <ng-container matColumnDef="createdAt">
            <th mat-header-cell mat-sort-header *matHeaderCellDef>
              {{ 'Created at' | translate }}
            </th>
            <td mat-cell *matCellDef="let school">
              {{ school.createdAt | date: 'short' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="updatedAt">
            <th mat-header-cell mat-sort-header *matHeaderCellDef>
              {{ 'Updated at' | translate }}
            </th>
            <td mat-cell *matCellDef="let school">
              {{ school.updatedAt | date: 'short' }}
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
              <a
                mat-icon-button
                color="accent"
                routerLink="edit"
                [queryParams]="{ id: item._id }"
              >
                <mat-icon>edit</mat-icon>
              </a>
              <button mat-icon-button color="warn">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="[
              'firstName',
              'surname',
              'plan',
              'group',
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
                'firstName',
                'surname',
                'plan',
                'group',
                'createdAt',
                'updatedAt',
                'actions'
              ]
            "
          ></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons/>
      </mat-card-content>
    </mat-card>
  `,
  providers: [],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsListComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Student>();
  private state = inject(StudentsStore);

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.state.students$.subscribe({
      next: (students) => {
        this.dataSource.data = students;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
}
