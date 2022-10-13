import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
    RouterModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  templateUrl: './class-groups-details.component.html',
  styleUrls: ['./class-groups-details.component.scss'],
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
