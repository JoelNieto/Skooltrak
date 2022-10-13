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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Period } from '@skooltrak-app/models';
import { PeriodsFormComponent } from './periods-form/periods-form.component';
import { PeriodsService } from './periods.service';
import { PeriodsStore } from './periods.store';

@Component({
  selector: 'skooltrak-periods',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss'],
  providers: [PeriodsService, provideComponentStore(PeriodsStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodsComponent implements OnInit {
  dataSource = new MatTableDataSource<Period>();
  constructor(
    private readonly store: PeriodsStore,
    private readonly dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.store.periods$.subscribe({
      next: (periods) => {
        this.dataSource.data = periods;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  newPeriod() {
    const dialogRef = this.dialog.open(PeriodsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
    dialogRef.beforeClosed().subscribe({
      next: (period: Period) => {
        !!period && this.store.createPeriod(period);
      },
    });
  }
}
