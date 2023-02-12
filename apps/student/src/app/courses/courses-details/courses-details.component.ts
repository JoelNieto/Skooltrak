import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { CoursesAssignmentsComponent } from '../courses-assignments/courses-assignments.component';
import { CoursesStore } from '../courses.store';

@Component({
  selector: 'sk-student-courses-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTabsModule,
    TranslateModule,
    CoursesAssignmentsComponent,
    LetModule,
  ],
  template: `
    <mat-card *ngrxLet="course$ as course">
      <mat-card-header>
        <mat-card-title>{{ course?.subject?.name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group mat-stretch-tabs="false" [dynamicHeight]>
          <mat-tab [label]="'Schedule' | translate">
            <sk-student-courses-assignments />
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDetailsComponent implements OnInit {
  private store = inject(CoursesStore);
  private readonly route = inject(ActivatedRoute);
  course$ = this.store.selectedCourse$;
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: ({ id }) => {
        this.store.setSelected(id);
      },
    });
  }
}
