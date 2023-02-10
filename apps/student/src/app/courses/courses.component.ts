import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { CoursesService } from './courses.service';
import { CoursesStore } from './courses.store';

@Component({
  selector: 'skooltrak-courses',
  standalone: true,
  imports: [RouterOutlet],
  template: ' <router-outlet/>',
  providers: [CoursesService, provideComponentStore(CoursesStore)],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {}
