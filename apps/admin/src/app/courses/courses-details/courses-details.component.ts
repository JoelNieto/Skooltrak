import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from '../courses.service';
import { CoursesStore } from '../courses.store';

@Component({
  selector: 'skooltrak-courses-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  template: `
    <mat-card *ngIf="course$ | async; let course">
      <mat-card-content>
        <mat-card-title>{{ course.subject.name }}</mat-card-title>
        <mat-card-subtitle>{{ course.plan.name }}</mat-card-subtitle>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: [],
  providers: [CoursesService, CoursesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDetailsComponent implements OnInit, OnDestroy {
  course$ = this.state.selectedCourse$;
  subscription = new Subscription();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly state: CoursesStore
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => {
          this.state.setSelected(id);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.state.setSelected(undefined);
  }
}
