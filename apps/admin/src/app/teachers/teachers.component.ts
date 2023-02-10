import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TeachersService } from './teachers.service';
import { TeachersStore } from './teachers.store';

@Component({
  selector: 'skooltrak-teachers',
  standalone: true,
  imports: [RouterOutlet],
  template: ' <router-outlet /> ',
  providers: [TeachersService, provideComponentStore(TeachersStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent {}
