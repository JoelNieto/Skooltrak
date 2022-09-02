import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-teacher',
  standalone: true,
  imports: [CommonModule, DashboardComponent, RouterModule],
  template: `
    <skooltrak-dashboard>
      <div class="container" main>
        <router-outlet></router-outlet>
      </div>
    </skooltrak-dashboard>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherComponent {
  constructor() {}
}
