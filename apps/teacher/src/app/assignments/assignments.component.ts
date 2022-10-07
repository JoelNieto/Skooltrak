import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'skooltrak-assignments',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsComponent {
  constructor() {}
}
