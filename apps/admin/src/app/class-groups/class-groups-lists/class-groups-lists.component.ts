import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ClassGroup } from '@skooltrak-app/models';
import { class_groups } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

import { ClassGroupsFormComponent } from '../class-groups-form/class-groups-form.component';

@Component({
  selector: 'skooltrak-class-groups-lists',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  template: `<mat-card
    ><div class="header-container">
      <mat-card-title>{{ 'Groups' | translate }}</mat-card-title>
      <button mat-flat-button color="primary" (click)="createGroup()">
        {{ 'New group' | translate }}
      </button>
    </div>
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
          <th mat-header-cell *matHeaderCellDef>{{ 'Actions' | translate }}</th>
          <td mat-cell *matCellDef="let item">
            <button mat-icon-button color="primary" (click)="editGroup(item)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn">
              <mat-icon>delete</mat-icon>
            </button>
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
  </mat-card> `,
  styles: [
    '.header-container { display: flex; align-items: center; justify-content: space-between }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsListsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ClassGroup>();
  subscription = new Subscription();
  constructor(
    private readonly state: class_groups.ClassGroupsFacade,
    private readonly dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.allClassGroups$.subscribe({
        next: (groups) => {
          this.dataSource.data = groups;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  createGroup() {
    this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
  }

  editGroup(group: ClassGroup) {
    this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: group,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
