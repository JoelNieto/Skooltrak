import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-student',
  standalone: true,
  imports: [CommonModule, DashboardComponent, RouterOutlet],
  template: `
    <skooltrak-dashboard>
      <div class="container" main>
        <router-outlet/>
      </div>
    </skooltrak-dashboard>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentComponent {}
