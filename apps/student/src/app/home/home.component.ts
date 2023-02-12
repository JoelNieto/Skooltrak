import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { LetModule } from '@ngrx/component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { auth } from '@skooltrak-app/state';
import { CalendarComponent } from '@skooltrak-app/ui';
import { filter, map } from 'rxjs';

@Component({
  selector: 'sk-student-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    TranslateModule,
    CalendarComponent,
    LetModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ message$ | async }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group mat-stretch-tabs="false" [dynamicHeight]="true">
          <mat-tab [label]="'News' | translate"></mat-tab>
          <mat-tab [label]="'Schedule' | translate">
            <skooltrak-calendar *ngrxLet="group$ as group" context="group" [contextId]="group?._id" />
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly auth = inject(auth.AuthFacade);
  private readonly translate = inject(TranslateService);

  student$ = this.auth.person$.pipe(map((person) => person?.student));
  group$ = this.student$.pipe(
    filter((student) => !!student),
    map((student) => student?.group)
  );

  message$ = this.student$.pipe(
    map((student) =>
      this.translate.instant('Welcome', { name: student?.firstName })
    )
  );
}
