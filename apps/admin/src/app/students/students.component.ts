import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { StudentsService } from './students.service';
import { StudentsStore } from './students.store';

@Component({
  selector: 'skooltrak-students',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet />',
  providers: [StudentsService, provideComponentStore(StudentsStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent {}
