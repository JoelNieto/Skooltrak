import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { School } from '@skooltrak-app/models';
import { schools as state } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-schools-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './schools-list.component.html',
  styleUrls: ['./schools-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsListComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<School>();
  subscription = new Subscription();
  constructor(private readonly store: state.SchoolsFacade) {}

  ngOnInit(): void {
    const schools = this.store.allSchools$.subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
    });
    this.subscription.add(schools);
    this.store.set(null);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
