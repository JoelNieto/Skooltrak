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
import { ClassGroup } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';
import { ClassGroupsFormComponent } from './class-groups-form/class-groups-form.component';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroupsStore } from './class-groups.store';

@Component({
  selector: 'skooltrak-class-groups',
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
        ></mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
  providers: [
    ConfirmationService,
    ClassGroupsService,
    provideComponentStore(ClassGroupsStore),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ClassGroup>();
  subscription = new Subscription();
  constructor(
    private readonly state: ClassGroupsStore,
    private readonly dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.groups$.subscribe({
        next: (groups) => {
          this.dataSource.data = groups;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  createGroup() {
    const dialogRef = this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });

    this.subscription.add(
      dialogRef.beforeClosed().subscribe({
        next: (group: ClassGroup) => {
          !!group && this.state.createClassGroup(group);
        },
      })
    );
  }

  editGroup(group: ClassGroup) {
    const dialogRef = this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: group,
    });

    this.subscription.add(
      dialogRef.beforeClosed().subscribe({
        next: (request: ClassGroup) => {
          !!group && this.state.patchClassGroup({ id: group._id, request });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
