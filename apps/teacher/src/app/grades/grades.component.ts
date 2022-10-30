import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import {
  ClassGroup,
  Course,
  Grade,
  Period,
  Student,
} from '@skooltrak-app/models';
import {
  GradesFormComponent,
  StudentGradeComponent,
  StudentNamePipe,
} from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';
import { GradesService } from './grades.service';
import { GradesStore } from './grades.store';

@Component({
  selector: 'skooltrak-grades',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    StudentNamePipe,
    MatInputModule,
    MatDialogModule,
    NgOptimizedImage,
    MatMenuModule,
    ReactiveFormsModule,
    TranslateModule,
    GradesFormComponent,
    StudentGradeComponent,
  ],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  providers: [GradesService, provideComponentStore(GradesStore)],
})
export class GradesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  dataSource = new MatTableDataSource<Student>();
  course = new FormControl<Course | null>(null, {
    validators: [Validators.required],
    nonNullable: true,
  });
  period = new FormControl<Period | undefined>(undefined);
  group = new FormControl<ClassGroup | undefined>(undefined);
  private store = inject(GradesStore);
  courses$ = this.store.courses$;
  groups$ = this.store.groups$;
  selectedGroup$ = this.store.selectedGroup$;
  periods$ = this.store.periods$;
  grades$ = this.store.grades$;
  columns = ['student'];
  private dialog = inject(MatDialog);

  @ViewChild(MatSort) private sort!: MatSort;

  ngOnInit(): void {
    this.iniSubscriptions();
  }

  public addGrade() {
    const dialog = this.dialog.open(GradesFormComponent, {
      panelClass: ['dialog', 'medium'],
      data: {
        course: this.course.getRawValue(),
        group: this.group.getRawValue(),
      },
    });

    this.subscription.add(
      dialog.beforeClosed().subscribe({
        next: (request: Partial<Grade>) => {
          !!request && this.store.createGrade(request);
        },
      })
    );
  }

  editGrade(grade: Grade) {
    const dialog = this.dialog.open(GradesFormComponent, {
      panelClass: ['dialog', 'medium'],
      data: {
        grade,
      },
    });

    this.subscription.add(
      dialog.beforeClosed().subscribe({
        next: (request: Partial<Grade>) => {
          !!request && this.store.patchGrade({ id: grade._id, request });
        },
      })
    );
  }

  private iniSubscriptions() {
    this.subscription.add(
      this.store.students$.subscribe({
        next: (students) => {
          this.dataSource.data = students;
          this.dataSource.sort = this.sort;
        },
      })
    );
    this.subscription.add(
      this.course.valueChanges.subscribe({
        next: (course) => {
          !!course && this.store.selectCourse(course);
        },
      })
    );
    this.subscription.add(
      this.group.valueChanges.subscribe({
        next: (group) => !!group && this.store.setSelectedGroup(group),
      })
    );

    this.subscription.add(
      this.period.valueChanges.subscribe({
        next: (period) => !!period && this.store.setSelectedPeriod(period),
      })
    );

    this.subscription.add(
      this.grades$.subscribe({
        next: (grades) => {
          this.columns = ['student', ...grades.map((x) => x._id)];
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
