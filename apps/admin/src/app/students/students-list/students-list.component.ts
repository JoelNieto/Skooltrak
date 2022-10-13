import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Student } from '@skooltrak-app/models';
import { StudentsService } from '../students.service';
import { StudentsStore } from '../students.store';

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
  providers: [StudentsService, StudentsStore],
  styleUrls: ['./students-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsListComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>();
  constructor(private state: StudentsStore) {}
  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngOnInit(): void {
    this.state.students$.subscribe({
      next: (students) => {
        this.dataSource.data = students;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
}
