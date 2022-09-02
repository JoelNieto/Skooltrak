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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Teacher } from '@skooltrak-app/models';
import { teachers } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

import { TeachersFormComponent } from '../teachers-form/teachers-form.component';

@Component({
  selector: 'skooltrak-teachers-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatSortModule,
    MatChipsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Teacher>();
  subscription = new Subscription();

  constructor(
    private state: teachers.TeachersFacade,
    private readonly dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.allTeachers$.subscribe({
        next: (result) => {
          this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  newTeacher() {
    this.dialog.open(TeachersFormComponent, {
      panelClass: ['dialog', 'medium'],
    });
  }

  editTeacher(teacher: Teacher) {
    this.dialog.open(TeachersFormComponent, {
      panelClass: ['dialog', 'medium'],
      data: teacher,
    });
  }

  goToDetails(id: string) {
    this.state.setTeacher(id);
    this.router.navigate(['details'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
