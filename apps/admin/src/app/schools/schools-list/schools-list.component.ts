import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { School } from '@skooltrak-app/models';
import { schools as state } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-schools-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    MatIconModule,
  ],
  template: `
    <mat-card>
      <mat-card-content>
        <div class="header-container">
          <mat-card-title>{{ 'Schools' | translate }}</mat-card-title>
          <a mat-flat-button color="primary" [routerLink]="['new']">{{
            'New school' | translate
          }}</a>
        </div>
        <table mat-table [dataSource]="dataSource">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>{{ 'Name' | translate }}</th>
            <td mat-cell *matCellDef="let school">{{ school.name }}</td>
          </ng-container>
          <ng-container matColumnDef="shortName">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Short name' | translate }}
            </th>
            <td mat-cell *matCellDef="let school">{{ school.shortName }}</td>
          </ng-container>
          <ng-container matColumnDef="createdAt">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Created at' | translate }}
            </th>
            <td mat-cell *matCellDef="let school">
              {{ school.createdAt | date: 'short' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="updatedAt">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Updated at' | translate }}
            </th>
            <td mat-cell *matCellDef="let school">
              {{ school.updatedAt | date: 'short' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Actions' | translate }}
            </th>
            <td mat-cell *matCellDef="let item">
              <a mat-icon-button color="primary" [routerLink]="[item._id]">
                <mat-icon>visibility</mat-icon>
              </a>
              <a
                mat-icon-button
                color="accent"
                [routerLink]="[item._id, 'edit']"
              >
                <mat-icon>edit</mat-icon>
              </a>
              <button mat-icon-button color="warn">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="[
              'name',
              'shortName',
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
                'createdAt',
                'updatedAt',
                'actions'
              ]
            "
          ></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<School>();
  subscription = new Subscription();
  private readonly store = inject(state.SchoolsFacade);

  ngOnInit(): void {
    const schools = this.store.allSchools$.subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
    });
    this.subscription.add(schools);
    this.store.set(null);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
