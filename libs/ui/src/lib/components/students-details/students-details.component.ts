import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { auth } from '@skooltrak-app/state';

import { Subscription } from 'rxjs';
import { AgeDatePipe } from '../../pipes/age-date/age-date.pipe';
import { StudentNamePipe } from '../../pipes/student-name/student-name.pipe';
import { DescriptionItemComponent } from '../description-item/description-item.component';
import { StudentsDetailsService } from './students-details.service';
import { StudentsDetailsStore } from './students-details.store';

@Component({
  selector: 'skooltrak-students-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    DescriptionItemComponent,
    TranslateModule,
    StudentNamePipe,
    AgeDatePipe,
    MatButtonModule,
    MatTabsModule,
    RouterModule,
  ],
  providers: [
    DatePipe,
    StudentsDetailsService,
    provideComponentStore(StudentsDetailsStore),
  ],
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsDetailsComponent implements OnInit, OnDestroy {
  student$ = this.state.student$;
  role$ = this.authentication.role$;
  loading$ = this.state.loading$;

  subscription = new Subscription();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly authentication: auth.AuthFacade,
    private readonly state: StudentsDetailsStore
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => {
          this.state.setId(id);
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
