import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { teacher_courses } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  constructor(private state: teacher_courses.CoursesFacade) {}

  ngOnInit(): void {
    this.state.init();
  }
}
