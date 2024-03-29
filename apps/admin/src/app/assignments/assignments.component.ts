import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'skooltrak-assignments',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet />',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsComponent {}
