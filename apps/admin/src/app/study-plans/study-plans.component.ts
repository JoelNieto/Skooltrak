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
  templateUrl: './study-plans.component.html',
  providers: [
    ConfirmationService,
    StudyPlansService,
    provideComponentStore(StudyPlansStore),
  ],
  styleUrls: ['./study-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlansComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<StudyPlan>();
  subscription = new Subscription();
  constructor(
    private readonly state: StudyPlansStore,
    private confirmation: ConfirmationService,
    private readonly dialog: MatDialog
  ) {}

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
