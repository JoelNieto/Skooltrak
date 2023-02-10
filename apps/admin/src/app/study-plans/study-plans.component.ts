import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { StudyPlan } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter, Subscription } from 'rxjs';
import { StudyPlanFormComponent } from './study-plan-form/study-plan-form.component';
import { StudyPlansService } from './study-plans.service';
import { StudyPlansStore } from './study-plans.store';

@Component({
  selector: 'skooltrak-study-plans',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    StudyPlanFormComponent,
  ],
  template: `
    <mat-card>
      <mat-card-content>
        <div class="header-container">
          <mat-card-title>{{ 'Plans' | translate }}</mat-card-title>
          <button mat-flat-button color="primary" (click)="createPlan()">
            {{ 'New plan' | translate }}
          </button>
        </div>
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Name' | translate }}
            </th>
            <td mat-cell *matCellDef="let subject">{{ subject?.name }}</td>
          </ng-container>
          <ng-container matColumnDef="degree">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Degree' | translate }}
            </th>
            <td mat-cell *matCellDef="let subject">
              {{ subject?.degree?.name }}
            </td>
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
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Actions' | translate }}
            </th>
            <td mat-cell *matCellDef="let item">
              <button mat-icon-button color="primary" (click)="editPlan(item)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deletePlan(item)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="[
              'name',
              'degree',
              'createdAt',
              'updatedAt',
              'actions'
            ]"
          ></tr>
          <tr
            mat-row
            *matRowDef="
              let row;
              columns: ['name', 'degree', 'createdAt', 'updatedAt', 'actions']
            "
          ></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons/>
      </mat-card-content>
    </mat-card>
  `,
  providers: [
    ConfirmationService,
    StudyPlansService,
    provideComponentStore(StudyPlansStore),
  ],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlansComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<StudyPlan>();
  subscription = new Subscription();

  private state = inject(StudyPlansStore);
  private confirmation = inject(ConfirmationService);
  private dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.plans$.subscribe({
        next: (result) => {
          this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  createPlan() {
    const dialogRef = this.dialog.open(StudyPlanFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });

    this.subscription.add(
      dialogRef.beforeClosed().subscribe({
        next: (request) => {
          !!request && this.state.createStudyPlan(request);
        },
      })
    );
  }

  editPlan(plan: StudyPlan) {
    const dialogRef = this.dialog.open(StudyPlanFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: plan,
    });

    this.subscription.add(
      dialogRef.beforeClosed().subscribe({
        next: (request) => {
          !!request && this.state.patchStudyPlan(request);
        },
      })
    );
  }

  deletePlan(plan: StudyPlan) {
    this.subscription.add(
      this.confirmation
        .openDialog('delete', plan.name)
        .pipe(filter((value) => value))
        .subscribe({ next: () => this.state.deleteStudyPlan(plan._id) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
