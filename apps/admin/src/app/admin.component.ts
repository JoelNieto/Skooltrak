import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-admin',
  standalone: true,
  imports: [CommonModule, DashboardComponent, TranslateModule, RouterOutlet],
  template: `
    <skooltrak-dashboard>
      <div class="container" main>
        <router-outlet />
      </div>
    </skooltrak-dashboard>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {}
