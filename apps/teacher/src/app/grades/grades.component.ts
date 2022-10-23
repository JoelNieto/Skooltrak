import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  GradesSimpleFormComponent,
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
    StudentNamePipe,
    MatInputModule,
    MatDialogModule,
    NgOptimizedImage,
    GradesSimpleFormComponent,
    ReactiveFormsModule,
    TranslateModule,
    GradesFormComponent,
  ],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  periods$ = this.store.periods$;
  grades$ = this.store.grades$;
  columns = ['student'];
  private dialog = inject(MatDialog);

  @ViewChild(MatSort) private sort!: MatSort;

  ngOnInit(): void {
    this.iniSubscriptions();
  }

  public addGrade() {
    const dialog = this.dialog.open(GradesSimpleFormComponent, {
      panelClass: ['dialog', 'medium'],
      data: {
        course: this.course.getRawValue(),
        group: this.group.getRawValue(),
      },
    });

    this.subscription.add(
      dialog.beforeClosed().subscribe({
        next: (request: Partial<Grade>) => {
          this.store.createGroup(request);
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
          !!course && this.store.setSelectedCourse(course);
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
