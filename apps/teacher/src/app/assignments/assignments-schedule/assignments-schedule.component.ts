import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-assignments-schedule',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule, CalendarComponent],
  template: `
    <mat-card>
      <mat-card-header
        ><mat-card-title>{{
          'Schedule' | translate
        }}</mat-card-title></mat-card-header
      >
      <mat-card-content>
        <skooltrak-calendar [contextQuery]="{}"></skooltrak-calendar>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsScheduleComponent {}
