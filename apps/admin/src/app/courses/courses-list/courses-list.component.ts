import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Course } from '@skooltrak-app/models';
import { courses } from '@skooltrak-app/state';
import { ConfirmationService, FullNamePipe } from '@skooltrak-app/ui';
import { filter, Subscription } from 'rxjs';

import { CoursesFormComponent } from '../courses-form/courses-form.component';

@Component({
  selector: 'skooltrak-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    FullNamePipe,
  ],
  providers: [ConfirmationService],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Course>();
  subscription = new Subscription();

  constructor(
    private readonly state: courses.CoursesFacade,
    private readonly dialog: MatDialog,
    private readonly confirmation: ConfirmationService
  ) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.allCourses$.subscribe({
        next: (result) => {
          this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  createCourse(): void {
    this.dialog.open(CoursesFormComponent, {
      panelClass: ['dialog', 'small'],
    });
  }

  editCourse(course: Course): void {
    this.dialog.open(CoursesFormComponent, {
      panelClass: ['dialog', 'small'],
      data: course,
    });
  }

  deleteCourse(id: string): void {
    this.subscription.add(
      this.confirmation
        .openDialog('delete')
        .pipe(filter((value) => value))
        .subscribe({ next: () => this.state.delete(id) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
