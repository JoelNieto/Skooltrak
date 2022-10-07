import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { GradeType } from '@skooltrak-app/models';
import { CourseGradeTypesService } from './courses-grade-types.service';
import { CourseGradeTypesStore } from './courses-grade-types.store';

@Component({
  selector: 'skooltrak-courses-grade-types',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    CourseGradeTypesService,
    provideComponentStore(CourseGradeTypesStore),
  ],
  templateUrl: './courses-grade-types.component.html',
  styleUrls: ['./courses-grade-types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesGradeTypesComponent implements OnInit {
  dataSource = new MatTableDataSource<GradeType>();
  constructor(private store: CourseGradeTypesStore) {}

  ngOnInit(): void {
    this.store.types$.subscribe({
      next: (types) => {
        this.dataSource.data = types;
      },
    });
  }
}
