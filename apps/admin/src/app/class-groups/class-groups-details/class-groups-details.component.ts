import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent } from '@skooltrak-app/ui';
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
        <mat-progress-bar mode="query"/>
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
              />
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </ng-container>
    </mat-card>
  `,
  styleUrls: [],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsDetailsComponent implements OnInit {
  private state = inject(ClassGroupsStore);
  private route = inject(ActivatedRoute);
  selectedGroup$ = this.state.selectedGroup$;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: ({ id }) => this.state.setClassGroup(id),
    });
  }
}
