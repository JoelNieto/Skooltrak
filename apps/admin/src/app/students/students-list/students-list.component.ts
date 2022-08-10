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
import { Student } from '@skooltrak-app/models';
import { admin_students } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-students-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    TranslateModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
  ],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsListComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>();
  constructor(private state: admin_students.StudentsFacade) {}
  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngOnInit(): void {
    this.state.allStudents$.subscribe({
      next: (students) => {
        this.dataSource.data = students;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
}
