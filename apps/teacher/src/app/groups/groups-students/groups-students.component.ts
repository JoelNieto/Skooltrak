import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Student } from '@skooltrak-app/models';
import { GroupsStudentsService } from './groups-students.service';
import { GroupsStudentsStore } from './groups-students.store';

@Component({
  selector: 'skooltrak-groups-students',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    TranslateModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'Students' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="dataSource">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>{{ 'Name' | translate }}</th>
            <td mat-cell *matCellDef="let item">{{ item.firstName }}</td>
          </ng-container>
          <ng-container matColumnDef="surname">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Surname' | translate }}
            </th>
            <td mat-cell *matCellDef="let item">{{ item.surname }}</td>
          </ng-container>
          <ng-container matColumnDef="birth_date">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Birthday' | translate }}
            </th>
            <td mat-cell *matCellDef="let item">
              {{ item.birthDate | date: 'mediumDate' }}
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
                [routerLink]="['/', 'students', 'details']"
                [queryParams]="{ id: item._id }"
              >
                <mat-icon>visibility</mat-icon>
              </a>
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="['name', 'surname', 'birth_date', 'actions']"
          ></tr>
          <tr
            mat-row
            *matRowDef="
              let row;
              columns: ['name', 'surname', 'birth_date', 'actions']
            "
          ></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    GroupsStudentsService,
    provideComponentStore(GroupsStudentsStore),
  ],
})
export class GroupsStudentsComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>();
  constructor(private store: GroupsStudentsStore) {}

  ngOnInit(): void {
    this.store.students$.subscribe({
      next: (students) => {
        this.dataSource.data = students;
      },
    });
  }
}
