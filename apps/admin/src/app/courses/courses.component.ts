import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { CoursesService } from './courses.service';
import { CoursesStore } from './courses.store';

@Component({
  selector: 'skooltrak-courses',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet> </router-outlet>',
  styleUrls: [],
  providers: [CoursesService, provideComponentStore(CoursesStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  constructor() {}
}
