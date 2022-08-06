import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Course } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  dataSource = new MatTableDataSource<Course>();
  subscription = new Subscription();
  constructor(private state: teacher_courses.CoursesFacade) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginatorModule) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.allCourses$.subscribe({
        next: (courses) => {
          this.dataSource.data = courses;
          this.sort = this.sort;
          this.paginator = this.paginator;
        },
      })
    );
  }
}
