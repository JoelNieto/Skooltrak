import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'skooltrak-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule, MatTabsModule],
  template: ` <mat-card>
    <mat-card-header>
      <mat-card-title>{{ 'Welcome' }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-tab-group> </mat-tab-group>
    </mat-card-content>
  </mat-card>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
