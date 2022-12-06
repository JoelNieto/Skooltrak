import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { GradeType } from '@skooltrak-app/models';
import { CourseGradeTypesService } from './courses-grade-types.service';
import { CourseGradeTypesStore } from './courses-grade-types.store';

@Component({
  selector: 'skooltrak-courses-grade-types',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    CourseGradeTypesService,
    provideComponentStore(CourseGradeTypesStore),
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'Types' | translate }}</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <table mat-table [dataSource]="dataSource">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Name' | translate }}
            </th>
            <td mat-cell *matCellDef="let type">
              {{ type.name }}
            </td>
          </ng-container>
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Type' | translate }}
            </th>
            <td mat-cell *matCellDef="let type">
              {{ type.type }}
            </td>
          </ng-container>
          <ng-container matColumnDef="weighting">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Weighting' | translate }}
            </th>
            <td mat-cell *matCellDef="let type">{{ type.weighting }}%</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>
              {{ 'Actions' | translate }}
            </th>
            <td mat-cell *matCellDef="let item">
              <button mat-icon-button color="primary">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr
            mat-header-row
            *matHeaderRowDef="['name', 'type', 'weighting', 'actions']"
          ></tr>
          <tr
            mat-row
            *matRowDef="
              let row;
              columns: ['name', 'type', 'weighting', 'actions']
            "
          ></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesGradeTypesComponent implements OnInit {
  dataSource = new MatTableDataSource<GradeType>();
  constructor(private store: CourseGradeTypesStore) {}

  ngOnInit(): void {
    this.store.types$.subscribe({
      next: (types) => {
        this.dataSource.data = types;
      },
    });
  }
}
