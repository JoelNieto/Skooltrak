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
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Degree } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter, Subscription } from 'rxjs';
import { DegreesFormComponent } from './degrees-form/degrees-form.component';
import { DegreesService } from './degrees.service';
import { DegreesStore } from './degrees.store';

@Component({
  selector: 'skooltrak-degrees',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    DegreesFormComponent,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  template: `
    <div class="header-container">
      <mat-card-title>{{ 'Degrees' | translate }}</mat-card-title>
      <button mat-flat-button color="primary" (click)="newDegree()">
        {{ 'New degree' | translate }}
      </button>
    </div>
    <table mat-table [dataSource]="dataSource" matSort>
      <ng-container matColumnDef="name">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by name"
        >
          {{ 'Name' | translate }}
        </th>
        <td mat-cell *matCellDef="let degree">{{ degree.name }}</td>
      </ng-container>
      <ng-container matColumnDef="level">
        <th mat-header-cell *matHeaderCellDef>{{ 'Level' | translate }}</th>
        <td mat-cell *matCellDef="let degree">{{ degree.level }}</td>
      </ng-container>
      <ng-container matColumnDef="school">
        <th mat-header-cell *matHeaderCellDef>{{ 'School' | translate }}</th>
        <td mat-cell *matCellDef="let degree">{{ degree.school.name }}</td>
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
          <button mat-icon-button color="primary" (click)="editDegree(item)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="delete(item)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>
      <tr
        mat-header-row
        *matHeaderRowDef="[
          'name',
          'level',
          'school',
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
            'level',
            'school',
            'createdAt',
            'updatedAt',
            'actions'
          ]
        "
      ></tr>
    </table>
    <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons>
    </mat-paginator>
  `,
  styleUrls: ['./degrees.component.scss'],
  providers: [
    ConfirmationService,
    DegreesService,
    provideComponentStore(DegreesStore),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DegreesComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Degree>();
  subscription = new Subscription();
  constructor(
    private store: DegreesStore,
    private dialog: MatDialog,
    private readonly confirmation: ConfirmationService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.store.degrees$.subscribe({
        next: (degrees) => {
          this.dataSource.data = degrees;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
      })
    );
  }

  newDegree() {
    const dialogRef = this.dialog.open(DegreesFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
    dialogRef.beforeClosed().subscribe({
      next: (request: Degree) => {
        !!request && this.store.createDegree(request);
      },
    });
  }

  editDegree(degree: Degree) {
    const dialogRef = this.dialog.open(DegreesFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: degree,
    });

    dialogRef.beforeClosed().subscribe({
      next: (request: Degree) => {
        !!request && this.store.patchDegree({ id: degree._id, request });
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(degree: Degree): void {
    this.confirmation
      .openDialog('delete', degree.name)
      .pipe(filter((value) => value))
      .subscribe({ next: () => this.store.deleteDegree(degree._id) });
  }
}
