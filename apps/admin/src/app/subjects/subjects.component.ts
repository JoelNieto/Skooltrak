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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter, Subscription } from 'rxjs';
import { SubjectsFormComponent } from './subjects-form/subjects-form.component';
import { SubjectsService } from './subjects.service';
import { SubjectsStore } from './subjects.store';

@Component({
  selector: 'skooltrak-subjects',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    SubjectsFormComponent,
    MatDialogModule,
    MatSortModule,
    MatButtonModule,
    TranslateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  template: `<mat-card>
    <mat-card-content>
      <div class="header-container">
        <mat-card-title>{{ 'Subjects' | translate }}</mat-card-title>
        <button mat-flat-button color="primary" (click)="newSubject()">
          {{ 'New subject' | translate }}
        </button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ 'Name' | translate }}
          </th>
          <td mat-cell *matCellDef="let subject">{{ subject.name }}</td>
        </ng-container>
        <ng-container matColumnDef="shortName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ 'Short name' | translate }}
          </th>
          <td mat-cell *matCellDef="let subject">{{ subject.shortName }}</td>
        </ng-container>
        <ng-container matColumnDef="parent">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ 'Parent subject' | translate }}
          </th>
          <td mat-cell *matCellDef="let subject">{{ subject.parent?.name }}</td>
        </ng-container>
        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ 'Created at' | translate }}
          </th>
          <td mat-cell *matCellDef="let subject">
            {{ subject.createdAt | date: 'short' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="updatedAt">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ 'Updated at' | translate }}
          </th>
          <td mat-cell *matCellDef="let subject">
            {{ subject.updatedAt | date: 'short' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>{{ 'Actions' | translate }}</th>
          <td mat-cell *matCellDef="let item">
            <button mat-icon-button color="primary" (click)="editSubject(item)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteSubject(item)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr
          mat-header-row
          *matHeaderRowDef="[
            'name',
            'shortName',
            'parent',
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
              'shortName',
              'parent',
              'createdAt',
              'updatedAt',
              'actions'
            ]
          "
        ></tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons>
      </mat-paginator>
    </mat-card-content>
  </mat-card> `,
  styleUrls: ['./subjects.component.scss'],
  providers: [
    ConfirmationService,
    SubjectsService,
    provideComponentStore(SubjectsStore),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Subject>();
  subscription = new Subscription();
  constructor(
    private state: SubjectsStore,
    private dialog: MatDialog,
    private confirmation: ConfirmationService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.subjects$.subscribe({
        next: (result) => {
          this.dataSource.data = result;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
      })
    );
  }

  newSubject() {
    const dialogRef = this.dialog.open(SubjectsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
    this.subscription.add(
      dialogRef.beforeClosed().subscribe({
        next: (request: Subject) => {
          !!request && this.state.createSubject(request);
        },
      })
    );
  }

  editSubject(subject: Subject) {
    const dialogRef = this.dialog.open(SubjectsFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: subject,
    });
    this.subscription.add(
      dialogRef.beforeClosed().subscribe({
        next: (request) => {
          !!request && this.state.patchSubject({ id: subject._id, request });
        },
      })
    );
  }

  deleteSubject(subject: Subject) {
    this.subscription.add(
      this.confirmation
        .openDialog('delete', subject.name)
        .pipe(filter((value) => value))
        .subscribe({ next: () => this.state.deleteSubject(subject._id) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
