import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentTypesComponent } from '../assignment-types/assignment-types.component';
import { DegreesComponent } from '../degrees/degrees.component';
import { PeriodsComponent } from '../periods/periods.component';

@Component({
  selector: 'skooltrak-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    AssignmentTypesComponent,
    DegreesComponent,
    PeriodsComponent,
    MatCardModule,
    MatIconModule,
    TranslateModule,
  ],
  template: `
    <div class="container">
      <mat-card-title>{{ 'Settings' | translate }}</mat-card-title>
      <mat-accordion>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title><mat-icon>add_task</mat-icon></mat-panel-title>
            <mat-panel-description>{{
              'Assignment types' | translate
            }}</mat-panel-description>
          </mat-expansion-panel-header>
          <skooltrak-assignment-types></skooltrak-assignment-types>
        </mat-expansion-panel>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title><mat-icon>history_edu</mat-icon></mat-panel-title>
            <mat-panel-description>{{
              'Degrees' | translate
            }}</mat-panel-description>
          </mat-expansion-panel-header>
          <skooltrak-degrees></skooltrak-degrees>
        </mat-expansion-panel>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title><mat-icon>date_range</mat-icon></mat-panel-title>
            <mat-panel-description>{{
              'Periods' | translate
            }}</mat-panel-description>
          </mat-expansion-panel-header>
          <skooltrak-periods></skooltrak-periods>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  constructor() {}
}
