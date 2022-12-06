import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
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
import { ClassGroup } from '@skooltrak-app/models';
import { teacher_groups } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-groups-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'Groups' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table matSort [dataSource]="dataSource">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Name' | translate }}
            </th>
            <td mat-cell *matCellDef="let group">{{ group.name }}</td>
          </ng-container>
          <ng-container matColumnDef="plan">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Plan' | translate }}
            </th>
            <td mat-cell *matCellDef="let group">{{ group.plan.name }}</td>
          </ng-container>
          <ng-container matColumnDef="counselor">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Counselor' | translate }}
            </th>
            <td mat-cell *matCellDef="let group">
              {{ group.counselor?.firstName }} {{ group.counselor?.surname }}
            </td>
          </ng-container>
          <ng-container matColumnDef="createdAt">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Created at' | translate }}
            </th>
            <td mat-cell *matCellDef="let degree">
              {{ degree.createdAt | date: 'short' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="updatedAt">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Updated at' | translate }}
            </th>
            <td mat-cell *matCellDef="let degree">
              {{ degree.updatedAt | date: 'short' }}
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
                [routerLink]="['details']"
                [queryParams]="{ id: item._id }"
              >
                <mat-icon>visibility</mat-icon>
              </a>
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="[
              'name',
              'plan',
              'counselor',
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
                'name',
                'plan',
                'counselor',
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
        ></mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ClassGroup>();
  subscription = new Subscription();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private state: teacher_groups.GroupsFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.state.allGroups$.subscribe({
        next: (groups) => {
          this.dataSource.data = groups;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
