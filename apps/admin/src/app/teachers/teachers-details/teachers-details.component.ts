import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Teacher } from '@skooltrak-app/models';
import { teachers } from '@skooltrak-app/state';
import { CalendarComponent } from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-teachers-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
    MatTabsModule,
    MatFormFieldModule,
    CalendarComponent,
  ],
  templateUrl: './teachers-details.component.html',
  styleUrls: ['./teachers-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersDetailsComponent implements OnInit, OnDestroy {
  teacher$ = this.state.selectedTeacher$;
  current: Teacher | undefined;
  subscription = new Subscription();
  teachers$ = this.state.allTeachers$;
  constructor(
    private readonly state: teachers.TeachersFacade,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => this.state.setTeacher(id),
      })
    );

    this.subscription.add(
      this.teacher$.subscribe({
        next: (teacher) => (this.current = teacher),
      })
    );
  }

  changeTeacher() {
    this.state.setTeacher(this.current?._id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.state.setTeacher(undefined);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
