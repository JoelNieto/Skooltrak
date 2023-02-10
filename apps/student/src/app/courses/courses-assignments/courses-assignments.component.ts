import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarComponent } from '@skooltrak-app/ui';
import { CoursesStore } from '../courses.store';

@Component({
  selector: 'skooltrak-courses-assignments',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  template: `
    <skooltrak-calendar context="course" [contextId]="id$ | async" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesAssignmentsComponent {
  private store = inject(CoursesStore);
  id$ = this.store.selectedId$;
}
