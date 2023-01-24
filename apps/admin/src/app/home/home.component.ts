import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'skooltrak-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule],
  template: ` <mat-card>
    <mat-card-header>
      <mat-card-title>{{ 'Welcome' }}</mat-card-title>
    </mat-card-header>
    <mat-card-content></mat-card-content>
  </mat-card>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor() {}
}
