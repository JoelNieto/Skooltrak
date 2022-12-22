import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent } from '@skooltrak-app/ui';
import { ClassGroupsService } from '../class-groups.service';
import { ClassGroupsStore } from '../class-groups.store';

@Component({
  selector: 'skooltrak-class-groups-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    CalendarComponent,
    LetModule,
    RouterModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  template: `
    <mat-card>
      <ng-template #loading>
        <mat-progress-bar mode="query"></mat-progress-bar>
      </ng-template>
      <ng-container *ngrxLet="selectedGroup$ as group; else loading">
        <mat-card-header>
          <mat-card-title>{{ group.name }}</mat-card-title>
          <mat-card-subtitle>{{ group.plan.name }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <mat-tab-group mat-stretch-tabs="false">
            <mat-tab [label]="'Schedule' | translate">
              <skooltrak-calendar
                context="group"
                [contextId]="group._id"
              ></skooltrak-calendar>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </ng-container>
    </mat-card>
  `,
  styleUrls: [],
  providers: [ClassGroupsStore, ClassGroupsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsDetailsComponent implements OnInit {
  selectedGroup$ = this.state.selectedGroup$;
  constructor(
    private readonly state: ClassGroupsStore,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: ({ id }) => this.state.setClassGroup(id),
    });
  }
}
