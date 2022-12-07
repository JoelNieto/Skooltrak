import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentType } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter } from 'rxjs';

import { AssignmentTypesFormComponent } from './assignment-types-form/assignment-types-form.component';
import { AssignmentTypesService } from './assignment-types.service';
import { AssignmentTypesStore } from './assignments-types.store';

@Component({
  selector: 'skooltrak-assignment-types',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    TranslateModule,
    MatSortModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [
    ConfirmationService,
    AssignmentTypesService,
    provideComponentStore(AssignmentTypesStore),
  ],
  template: `
    <div class="header-container">
      <mat-card-title>{{ 'Assignment types' | translate }}</mat-card-title>
      <button mat-flat-button color="primary" (click)="newType()">
        {{ 'New type' | translate }}
      </button>
    </div>
    <table mat-table [dataSource]="dataSource" matSort>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'Name' | translate }}
        </th>
        <td mat-cell *matCellDef="let type">
          {{ type.name }}
        </td>
      </ng-container>
      <ng-container matColumnDef="summative">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'Summative' | translate }}
        </th>
        <td mat-cell *matCellDef="let type">
          {{ type.summative }}
        </td>
      </ng-container>
      <ng-container matColumnDef="color">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'Color' | translate }}
        </th>
        <td mat-cell *matCellDef="let type">
          {{ type.color }}
        </td>
      </ng-container>
      <ng-container matColumnDef="createdAt">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'Created at' | translate }}
        </th>
        <td mat-cell *matCellDef="let type">
          {{ type.createdAt | date: 'short' }}
        </td>
      </ng-container>
      <ng-container matColumnDef="updatedAt">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'Updated at' | translate }}
        </th>
        <td mat-cell *matCellDef="let type">
          {{ type.updatedAt | date: 'short' }}
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>{{ 'Actions' | translate }}</th>
        <td mat-cell *matCellDef="let item">
          <button mat-icon-button color="primary" (click)="editType(item)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="deleteType(item)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>
      <tr
        mat-header-row
        *matHeaderRowDef="[
          'name',
          'summative',
          'color',
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
            'summative',
            'color',
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
export class AssignmentTypesComponent implements OnInit {
  dataSource = new MatTableDataSource<AssignmentType>();
  private confirmation = inject(ConfirmationService);
  private dialog = inject(MatDialog);
  private state = inject(AssignmentTypesStore);

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngOnInit(): void {
    this.state.types$.subscribe({
      next: (types) => {
        this.dataSource.data = types;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  newType(): void {
    const dialogRef = this.dialog.open(AssignmentTypesFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
    dialogRef.beforeClosed().subscribe({
      next: (request) => {
        !!request && this.state.createType(request);
      },
    });
  }

  editType(type: AssignmentType): void {
    const dialogRef = this.dialog.open(AssignmentTypesFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: type,
    });
    dialogRef.beforeClosed().subscribe({
      next: (request: AssignmentType) => {
        !!request && this.state.patchType({ id: type._id, request });
      },
    });
  }

  deleteType(type: AssignmentType): void {
    this.confirmation
      .openDialog('delete', type.name)
      .pipe(filter((value) => value))
      .subscribe({ next: () => this.state.deleteType(type._id) });
  }
}
