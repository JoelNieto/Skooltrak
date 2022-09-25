import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Assignment } from '@skooltrak-app/models';
import { teacher_groups } from '@skooltrak-app/state';
import {
  AssignmentDetailsComponent,
  CalendarComponent,
} from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-groups-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTabsModule,
    RouterModule,
    MatDialogModule,
    CalendarComponent,
    TranslateModule,
  ],
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsDetailsComponent implements OnInit, OnDestroy {
  selectedGroup$ = this.store.selectedGroup$;
  subscription = new Subscription();
  constructor(
    private readonly store: teacher_groups.GroupsFacade,
    private readonly dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => {
          this.store.setGroup(id);
        },
      })
    );
  }

  assignmentDetails(assignment: Assignment) {
    this.dialog.open(AssignmentDetailsComponent, {
      data: { assignment },
      panelClass: ['dialog', 'medium'],
    });
  }

  ngOnDestroy(): void {
    this.store.setGroup(undefined);
    this.subscription.unsubscribe();
  }
}
