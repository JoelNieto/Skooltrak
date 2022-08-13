import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentType } from '@skooltrak-app/models';
import { assignments_types } from '@skooltrak-app/state';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter } from 'rxjs';

import { AssignmentTypesFormComponent } from './assignment-types-form/assignment-types-form.component';

@Component({
  selector: 'skooltrak-assignment-types',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    TranslateModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './assignment-types.component.html',
  styles: [
    `
      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentTypesComponent implements OnInit {
  dataSource = new MatTableDataSource<AssignmentType>();

  constructor(
    private state: assignments_types.AssignmentTypesFacade,
    private confirmation: ConfirmationService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngOnInit(): void {
    this.state.allAssignmentTypes$.subscribe({
      next: (types) => {
        this.dataSource.data = types;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
    this.state.init();
  }

  newType(): void {
    this.dialog.open(AssignmentTypesFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
  }

  editType(type: AssignmentType): void {
    this.dialog.open(AssignmentTypesFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: type,
    });
  }

  deleteType(type: AssignmentType): void {
    console.log(type);
    this.confirmation
      .openDialog('delete', type.name)
      .pipe(filter((value) => value))
      .subscribe({ next: () => this.state.delete(type._id) });
  }
}
