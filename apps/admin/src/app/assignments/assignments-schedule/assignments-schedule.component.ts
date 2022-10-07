import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-assignments-schedule',
  standalone: true,
  imports: [CommonModule, CalendarComponent, MatCardModule, TranslateModule],
  templateUrl: './assignments-schedule.component.html',
  styleUrls: ['./assignments-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsScheduleComponent {
  constructor() {}
}
