import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { ClassGroup, Course, Period, Student } from '@skooltrak-app/models';
import { StudentNamePipe } from '@skooltrak-app/ui';
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
    MatSortModule,
    StudentNamePipe,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GradesService, provideComponentStore(GradesStore)],
})
export class GradesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  dataSource = new MatTableDataSource<Student>();
  course = new FormControl<Course | undefined>(undefined);
  period = new FormControl<Period | undefined>(undefined);
  group = new FormControl<ClassGroup | undefined>(undefined);

  courses$ = this.store.courses$;
  groups$ = this.store.groups$;
  constructor(private store: GradesStore) {}

  @ViewChild(MatSort) private sort!: MatSort;

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
