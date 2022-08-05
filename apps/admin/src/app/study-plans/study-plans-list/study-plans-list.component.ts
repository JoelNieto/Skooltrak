import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { StudyPlan } from '@skooltrak-app/models';
import { plans as state } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

import { StudyPlanFormComponent } from '../study-plan-form/study-plan-form.component';

@Component({
  selector: 'skooltrak-study-plans-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    TranslateModule,
    StudyPlanFormComponent,
  ],
  templateUrl: './study-plans-list.component.html',
  styleUrls: ['./study-plans-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlansListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<StudyPlan>();
  subscription = new Subscription();
  constructor(
    private readonly state: state.StudyPlansFacade,
    private readonly dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.allStudyPlans$.subscribe({
        next: (plans) => {
          this.dataSource.data = plans;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  createPlan() {
    this.dialog.open(StudyPlanFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
  }

  editPlan(plan: StudyPlan) {
    this.dialog.open(StudyPlanFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: plan,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
