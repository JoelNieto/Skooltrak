import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Assignment } from '@skooltrak-app/models';
import { Observable, switchMap } from 'rxjs';
import { AssignmentDatePipe } from '../../pipes/assignment-date/assignment-date.pipe';
import { AssignmentDetailsService } from './assignment-details.service';

@Component({
  selector: 'skooltrak-assignment-details',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    RouterModule,
    AssignmentDatePipe,
  ],
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.scss'],
  providers: [AssignmentDetailsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentDetailsComponent {
  assignment$: Observable<Assignment>;
  constructor(
    private route: ActivatedRoute,
    private service: AssignmentDetailsService
  ) {
    this.assignment$ = this.route.params.pipe(
      switchMap(({ id }) => this.service.getAssignment(id))
    );
  }
}
