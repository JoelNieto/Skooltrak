import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Assignment } from '@skooltrak-app/models';

@Component({
  selector: 'skooltrak-assignment-details',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'student' | 'admin' | 'teacher';
      assignment: Assignment;
    }
  ) {}
}
