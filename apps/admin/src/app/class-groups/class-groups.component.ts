import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { ClassGroup } from '@skooltrak-app/models';
import { ConfirmationService } from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';
import { ClassGroupsFormComponent } from './class-groups-form/class-groups-form.component';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroupsStore } from './class-groups.store';

@Component({
  selector: 'skooltrak-class-groups',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    ClassGroupsFormComponent,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './class-groups.component.html',
  styles: [
    `
      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
  providers: [
    ConfirmationService,
    ClassGroupsService,
    provideComponentStore(ClassGroupsStore),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ClassGroup>();
  subscription = new Subscription();
  constructor(
    private readonly state: ClassGroupsStore,
    private readonly dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription.add(
      this.state.groups$.subscribe({
        next: (groups) => {
          this.dataSource.data = groups;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      })
    );
  }

  createGroup() {
    this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
    });
  }

  editGroup(group: ClassGroup) {
    this.dialog.open(ClassGroupsFormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: group,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
