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
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Teacher } from '@skooltrak-app/models';
import { Subscription } from 'rxjs';

import { TeachersFormComponent } from '../teachers-form/teachers-form.component';
import { TeachersService } from '../teachers.service';
import { TeachersStore } from '../teachers.store';

@Component({
  selector: 'skooltrak-teachers-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatSortModule,
    MatChipsModule,
    RouterModule,
    TranslateModule,
  ],
  template: `
    <mat-card>
      <mat-card-content>
        <div class="header-container">
          <mat-card-title>{{ 'Teachers' | translate }}</mat-card-title>
          <button mat-flat-button color="primary" (click)="newTeacher()">
            {{ 'New teacher' | translate }}
          </button>
        </div>
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Name' | translate }}
            </th>
            <td mat-cell *matCellDef="let teacher">
              {{ teacher.firstName }} {{ teacher.surname }}
            </td>
          </ng-container>
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'Email' | translate }}
            </th>
            <td mat-cell *matCellDef="let teacher">
              {{ teacher.email }}
            </td>
          </ng-container>
          <ng-container matColumnDef="subjects">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Subjects' | translate }}
            </th>
            <td mat-cell *matCellDef="let teacher">
              <mat-chip-listbox>
                <mat-chip
                  *ngFor="let subject of teacher.subjects"
                  color="primary"
                  selected
                  >{{ subject.name }}</mat-chip
                >
              </mat-chip-listbox>
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
              <a
                mat-icon-button
                color="primary"
                [routerLink]="['details']"
                [queryParams]="{ id: item._id }"
              >
                <mat-icon>visibility</mat-icon>
              </a>
              <button
                mat-icon-button
                color="accent"
                (click)="editTeacher(item)"
              >
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
              'email',
              'subjects',
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
                'email',
                'subjects',
                'createdAt',
                'updatedAt',
                'actions'
              ]
            "
          ></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons />
      </mat-card-content>
    </mat-card>
  `,
  providers: [TeachersService, TeachersStore],
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
export class TeachersListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Teacher>();
  subscription = new Subscription();

  constructor(
    private state: TeachersStore,
    private readonly dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.teachers$.subscribe({
        next: (result) => {
          this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  newTeacher() {
    this.dialog.open(TeachersFormComponent, {
      panelClass: ['dialog', 'medium'],
    });
  }

  editTeacher(teacher: Teacher) {
    this.dialog.open(TeachersFormComponent, {
      panelClass: ['dialog', 'medium'],
      data: teacher,
    });
  }

  goToDetails(id: string) {
    this.state.setSelected(id);
    this.router.navigate(['details'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
