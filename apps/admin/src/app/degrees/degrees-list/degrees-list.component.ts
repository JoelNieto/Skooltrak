import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Degree } from '@skooltrak-app/models';
import { degrees as state } from '@skooltrak-app/state';
import { ConfirmationService } from '@skooltrak-app/ui';
import { filter, Subscription } from 'rxjs';

import { DegreesFormComponent } from '../degrees-form/degrees-form.component';

@Component({
  selector: 'skooltrak-degrees-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    MatDialogModule,
    DegreesFormComponent,
    MatSortModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './degrees-list.component.html',
  styleUrls: ['./degrees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DegreesListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Degree>();
  subscription$ = new Subscription();
  constructor(
    private store: state.DegreesFacade,
    private dialog: MatDialog,
    private readonly confirmation: ConfirmationService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.subscription$.add(
      this.store.allDegrees$.subscribe({
        next: (degrees) => {
          this.dataSource.data = degrees;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  newDegree() {
    this.dialog.open(DegreesFormComponent, {
      panelClass: ['dialog', 'small'],
    });
  }

  editDegree(degree: Degree) {
    this.dialog.open(DegreesFormComponent, {
      panelClass: ['dialog', 'small'],
      data: degree,
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  delete(id: string): void {
    this.confirmation
      .openDialog()
      .pipe(filter((value) => value))
      .subscribe({ next: () => this.store.delete(id) });
  }
}
