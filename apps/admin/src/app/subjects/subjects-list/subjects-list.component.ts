import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from '@skooltrak-app/models';
import { subjects } from '@skooltrak-app/state';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter, Subscription } from 'rxjs';

import { SubjectsFormComponent } from '../subjects-form/subjects-form.component';

@Component({
  selector: 'skooltrak-subjects-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    SubjectsFormComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Subject>();
  subscription = new Subscription();
  constructor(
    private state: subjects.SubjectsFacade,
    private dialog: MatDialog,
    private confirmation: ConfirmationService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.allSubjects$.subscribe({
        next: (result) => {
          this.dataSource.data = result;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
      })
    );
  }

  newSubject() {
    this.dialog.open(SubjectsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
  }

  editSubject(subject: Subject) {
    this.dialog.open(SubjectsFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: subject,
    });
  }

  deleteSubject(subject: Subject) {
    this.confirmation
      .openDialog('delete', subject.name)
      .pipe(filter((value) => value))
      .subscribe({ next: () => this.state.delete(subject._id) });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
