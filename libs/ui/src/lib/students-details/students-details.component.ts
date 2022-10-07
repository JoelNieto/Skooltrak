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
import { TranslateModule } from '@ngx-translate/core';
import { admin_students } from '@skooltrak-app/state';

import { Subscription } from 'rxjs';
import { DescriptionItemComponent } from '../description-item/description-item.component';
import { AgeDatePipe } from '../pipes/age-date/age-date.pipe';
import { StudentNamePipe } from '../pipes/student-name/student-name.pipe';

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
  providers: [DatePipe],
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsDetailsComponent implements OnInit, OnDestroy {
  student$ = this.state.selectedStudent$;

  subscription = new Subscription();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly state: admin_students.StudentsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => {
          this.state.setStudent(id);
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.state.setStudent(undefined);
    this.subscription.unsubscribe();
  }
}
