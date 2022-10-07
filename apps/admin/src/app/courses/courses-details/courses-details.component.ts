import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { courses } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-courses-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDetailsComponent implements OnInit, OnDestroy {
  course$ = this.state.selectedCourse$;
  subscription = new Subscription();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly state: courses.CoursesFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => {
          this.state.setCourse(id);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.state.setCourse(undefined);
  }
}
