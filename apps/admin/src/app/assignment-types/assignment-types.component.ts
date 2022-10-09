import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentType } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter } from 'rxjs';

import { AssignmentTypesFormComponent } from './assignment-types-form/assignment-types-form.component';
import { AssignmentTypesService } from './assignment-types.service';
import { AssignmentTypesStore } from './assignments-types.store';

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
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [
    ConfirmationService,
    AssignmentTypesService,
    provideComponentStore(AssignmentTypesStore),
  ],
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
    private state: AssignmentTypesStore,
    private confirmation: ConfirmationService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngOnInit(): void {
    this.state.types$.subscribe({
      next: (types) => {
        this.dataSource.data = types;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  newType(): void {
    const dialogRef = this.dialog.open(AssignmentTypesFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
    dialogRef.beforeClosed().subscribe({
      next: (request) => {
        !!request && this.state.createType(request);
      },
    });
  }

  editType(type: AssignmentType): void {
    const dialogRef = this.dialog.open(AssignmentTypesFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: type,
    });
    dialogRef.beforeClosed().subscribe({
      next: (request: AssignmentType) => {
        !!request && this.state.patchType({ id: type._id, request });
      },
    });
  }

  deleteType(type: AssignmentType): void {
    this.confirmation
      .openDialog('delete', type.name)
      .pipe(filter((value) => value))
      .subscribe({ next: () => this.state.deleteType(type._id) });
  }
}
