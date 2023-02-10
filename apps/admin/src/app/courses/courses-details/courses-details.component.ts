import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { Subject, takeUntil } from 'rxjs';
import { CoursesStore } from '../courses.store';

@Component({
  selector: 'skooltrak-courses-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, LetModule],
  template: `
    <mat-card *ngrxLet="course$ as course">
      <mat-card-content>
        <mat-card-title>{{ course.subject.name }}</mat-card-title>
        <mat-card-subtitle>{{ course.plan.name }}</mat-card-subtitle>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: [],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  private readonly route = inject(ActivatedRoute);
  private readonly state = inject(CoursesStore);

  course$ = this.state.selectedCourse$;

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ id }) => {
        this.state.setSelected(id);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.state.setSelected(undefined);
  }
}
