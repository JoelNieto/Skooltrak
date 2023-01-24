import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Period } from '@skooltrak-app/models';
import { PeriodsFormComponent } from './periods-form/periods-form.component';
import { PeriodsService } from './periods.service';
import { PeriodsStore } from './periods.store';

@Component({
  selector: 'skooltrak-periods',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
    MatIconModule,
  ],
  template: `
    <div class="header-container">
      <mat-card-title>{{ 'Periods' | translate }}</mat-card-title>
      <button mat-flat-button color="primary" (click)="newPeriod()">
        {{ 'New period' | translate }}
      </button>
    </div>
    <table mat-table [dataSource]="dataSource" matSort>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'Name' | translate }}
        </th>
        <td mat-cell *matCellDef="let item">{{ item.name }}</td>
      </ng-container>
      <ng-container matColumnDef="school">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'School' | translate }}
        </th>
        <td mat-cell *matCellDef="let item">{{ item.school.name }}</td>
      </ng-container>
      <ng-container matColumnDef="sort">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'Sort' | translate }}
        </th>
        <td mat-cell *matCellDef="let item">{{ item.sort }}</td>
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
      <tr
        mat-header-row
        *matHeaderRowDef="['name', 'school', 'sort', 'createdAt', 'updatedAt']"
      ></tr>
      <tr
        mat-row
        *matRowDef="
          let row;
          columns: ['name', 'school', 'sort', 'createdAt', 'updatedAt']
        "
      ></tr>
    </table>
    <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons />

  `,
  styles: [
    `
      :host {
        display: block;
      }

      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
  providers: [PeriodsService, provideComponentStore(PeriodsStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodsComponent implements OnInit {
  dataSource = new MatTableDataSource<Period>();
  constructor(
    private readonly store: PeriodsStore,
    private readonly dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.store.periods$.subscribe({
      next: (periods) => {
        this.dataSource.data = periods;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  newPeriod() {
    const dialogRef = this.dialog.open(PeriodsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
    dialogRef.beforeClosed().subscribe({
      next: (period: Period) => {
        !!period && this.store.createPeriod(period);
      },
    });
  }
}
