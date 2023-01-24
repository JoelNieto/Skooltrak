import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TeachersStore } from '../teachers/teachers.store';
import { StudentsService } from './students.service';

@Component({
  selector: 'skooltrak-students',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet />',
  providers: [StudentsService, provideComponentStore(TeachersStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent {}
