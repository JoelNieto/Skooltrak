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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClassGroup } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { Subject, takeUntil } from 'rxjs';
import { ClassGroupsFormComponent } from '../class-groups-form/class-groups-form.component';
import { ClassGroupsStore } from '../class-groups.store';

@Component({
  selector: 'skooltrak-class-groups-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    ClassGroupsFormComponent,
    MatButtonModule,
    RouterModule,
  ],
  template: `
  <mat-card>
    <mat-card-content>
      <div class="header-container">
        <mat-card-title>{{ 'Groups' | translate }}</mat-card-title>
        <button mat-flat-button color="primary" (click)="createGroup()">
          {{ 'New group' | translate }}
        </button>
      </div>
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
              routerLink="details"
              [queryParams]="{ id: item._id }"
            >
              <mat-icon>visibility</mat-icon>
            </a>
            <button mat-icon-button color="accent" (click)="editGroup(item)">
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
      />
    </mat-card-content>
  </mat-card>
`,
  styles: [],
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsListComponent implements AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<ClassGroup>();
  destroy$: Subject<void> = new Subject();
  private state = inject(ClassGroupsStore);
  private dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.state.groups$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (groups) => {
        this.dataSource.data = groups;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  createGroup() {
    const dialogRef = this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });

    dialogRef
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (group: ClassGroup) => {
          !!group && this.state.createClassGroup(group);
        },
      });
  }

  editGroup(group: ClassGroup) {
    const dialogRef = this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: group,
    });

    dialogRef
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (request: ClassGroup) => {
          !!request && this.state.patchClassGroup({ id: group._id, request });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
