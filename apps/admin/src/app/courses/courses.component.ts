import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { courses } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-courses',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  constructor(private readonly state: courses.CoursesFacade) {}

  ngOnInit(): void {
    this.state.init();
  }
}
