import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Teacher } from '@skooltrak-app/models';
import { CalendarComponent } from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';
import { TeachersService } from '../teachers.service';
import { TeachersStore } from '../teachers.store';

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
  template: `
    <mat-card>
      <mat-card-content>
        <div class="row">
          <div class="col-md-8">
            <mat-card-title>
              {{ 'Teacher' | translate }}
            </mat-card-title>
          </div>
          <div class="col-md-4">
            <mat-form-field>
              <mat-label>{{ 'Teacher' | translate }}</mat-label>
              <mat-select
                [(ngModel)]="current"
                (ngModelChange)="changeTeacher()"
                [compareWith]="compareFn"
              >
                <mat-option
                  *ngFor="let teacher of teachers$ | async"
                  [value]="teacher"
                  >{{ teacher.firstName }} {{ teacher.surname }}</mat-option
                >
              </mat-select>
            </mat-form-field>
          </div>
        </div>
        <mat-tab-group mat-stretch-tabs="false">
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="tab-icon">calendar_month</mat-icon>
              {{ 'Schedule' | translate }}
            </ng-template>
            <skooltrak-calendar
              context="teacher"
              [contextId]="current._id"
            />
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  providers: [TeachersService, TeachersStore],
  styles: [
    `
      .header-container {
        display: flex;
      }

      .tab-icon {
        margin-right: 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersDetailsComponent implements OnInit, OnDestroy {
  teacher$ = this.state.selectedTeacher$;
  current: Teacher | undefined;
  subscription = new Subscription();
  teachers$ = this.state.teachers$;
  constructor(
    private readonly state: TeachersStore,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: ({ id }) => this.state.setSelected(id),
      })
    );

    this.subscription.add(
      this.teacher$.subscribe({
        next: (teacher) => (this.current = teacher),
      })
    );
  }

  changeTeacher() {
    this.state.setSelected(this.current?._id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.state.setSelected(undefined);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
