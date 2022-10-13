import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Grade, Period } from '@skooltrak-app/models';
import { Subscription } from 'rxjs';
import { CoursesGradesService } from './courses-grades.service';
import { CoursesGradesStore } from './courses-grades.store';

@Component({
  selector: 'skooltrak-courses-grades',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    TranslateModule,
  ],
  templateUrl: './courses-grades.component.html',
  styleUrls: ['./courses-grades.component.scss'],
  providers: [CoursesGradesService, provideComponentStore(CoursesGradesStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesGradesComponent implements OnInit, OnDestroy {
  periods$ = this.store.periods$;
  groups$ = this.store.groups$;
  subscription = new Subscription();
  periodControl = new FormControl<Period | undefined>(undefined);
  dataSource = new MatTableDataSource<Grade>();

  constructor(private store: CoursesGradesStore) {}

  ngOnInit(): void {
    this.subscription.add(
      this.periodControl.valueChanges.subscribe({
        next: (value) => {
          !!value && this.store.setSelectedPeriod(value);
        },
      })
    );
    this.subscription.add(
      this.store.grades$.subscribe({
        next: (grades) => {
          this.dataSource.data = grades;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
