import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Grade, Period } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { GradesFormComponent } from '@skooltrak-app/ui';
import { combineLatestWith, Subscription, switchMap } from 'rxjs';
import { CoursesGradesService } from './courses-grades.service';
import { CoursesGradesStore } from './courses-grades.store';

@Component({
  selector: 'skooltrak-courses-grades',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    GradesFormComponent,
    ReactiveFormsModule,
    MatTableModule,
    TranslateModule,
  ],
  templateUrl: './courses-grades.component.html',
  styleUrls: ['./courses-grades.component.scss'],
  providers: [CoursesGradesService, provideComponentStore(CoursesGradesStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesGradesComponent implements OnInit, OnDestroy {
  periods$ = this.store.periods$;
  groups$ = this.store.groups$;
  subscription = new Subscription();
  periodControl = new FormControl<Period | undefined>(undefined);
  dataSource = new MatTableDataSource<Grade>();

  constructor(
    private store: CoursesGradesStore,
    private dialog: MatDialog,
    private state: teacher_courses.CoursesFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.periodControl.valueChanges.subscribe({
        next: (value) => {
          !!value && this.store.setSelectedPeriod(value);
        },
      })
    );
    this.subscription.add(
      this.store.grades$.subscribe({
        next: (grades) => {
          this.dataSource.data = grades;
        },
      })
    );
  }

  newGrade() {
    const { selectedCourse$ } = this.state;
    const { selectedPeriod$ } = this.store;

    this.subscription.add(
      selectedPeriod$
        .pipe(
          combineLatestWith(selectedCourse$),
          switchMap(([period, course]) => {
            const dialogRef = this.dialog.open(GradesFormComponent, {
              panelClass: ['dialog', 'medium'],
              data: { period, course },
            });
            return dialogRef.afterClosed();
          })
        )
        .subscribe({ next: () => this.store.fetchGrades() })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
