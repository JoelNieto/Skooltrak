import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { teacher_groups } from '@skooltrak-app/state';
import { CalendarComponent } from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';
import { GroupsStudentsComponent } from '../groups-students/groups-students.component';

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
    GroupsStudentsComponent,
    CalendarComponent,
    TranslateModule,
  ],
  template: `
    <mat-card>
      <ng-template #loading>
        <mat-progress-bar mode="query"/>
      </ng-template>
      <ng-container *ngIf="selectedGroup$ | async; else loading; let group">
        <mat-card-header>
          <mat-card-title>{{ group.name }}</mat-card-title>
          <mat-card-subtitle>{{ group.plan.name }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <mat-tab-group mat-stretch-tabs="false" dynamicHeight>
            <mat-tab [label]="'Schedule' | translate">
              <skooltrak-calendar
                context="group"
                [contextId]="group._id"
              />
            </mat-tab>
            <mat-tab [label]="'Students' | translate">
              <skooltrak-groups-students />
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </ng-container>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsDetailsComponent implements OnInit, OnDestroy {
  selectedGroup$ = this.store.selectedGroup$;
  subscription = new Subscription();
  constructor(
    private readonly store: teacher_groups.GroupsFacade,
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

  ngOnDestroy(): void {
    this.store.setGroup(undefined);
    this.subscription.unsubscribe();
  }
}
