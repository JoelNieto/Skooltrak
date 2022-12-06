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
  template: `
    <mat-card>
      <ng-template #loading>
        <mat-progress-bar mode="query"></mat-progress-bar>
      </ng-template>
      <ng-container *ngIf="assignment$ | async; else loading; let assignment">
        <mat-card-header>
          <mat-card-title>
            {{ assignment.title }}
          </mat-card-title>
          <mat-card-subtitle>
            {{ assignment | assignmentDate }}
          </mat-card-subtitle>
          <mat-card-subtitle>
            <mat-chip-listbox>
              <mat-chip-option color="warn" selected>{{
                assignment.type.name
              }}</mat-chip-option>
              <mat-chip-option
                color="accent"
                selected
                [routerLink]="['/', 'courses', 'details']"
                [queryParams]="{ id: assignment.course._id }"
                >{{ assignment.course.subject.name }}
              </mat-chip-option>
              <mat-chip-option
                color="primary"
                selected
                [routerLink]="['/', 'class-groups', 'details']"
                [queryParams]="{ id: assignment.group._id }"
                >{{ assignment.group.name }}
              </mat-chip-option>
              <mat-chip-option
                [routerLink]="['/', 'teachers', 'details']"
                [queryParams]="{ id: assignment.teacher?._id }"
              >
                <img
                  matChipAvatar
                  [src]="assignment.createdBy?.profileURL"
                  [alt]="assignment.createdBy?.displayName"
                />
                {{ assignment.createdBy?.displayName }}
              </mat-chip-option>
            </mat-chip-listbox>
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <h6>{{ 'Directions' | translate }}</h6>
          <div [innerHtml]="assignment.description"></div>
        </mat-card-content>
      </ng-container>
    </mat-card>
  `,
  styles: [],
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
