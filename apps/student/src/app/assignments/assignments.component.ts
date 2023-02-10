import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'skooltrak-assignments',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsComponent {}
