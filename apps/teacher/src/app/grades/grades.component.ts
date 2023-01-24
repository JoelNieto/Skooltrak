import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GradesPageComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-grades',
  standalone: true,
  imports: [CommonModule, GradesPageComponent],
  styles: [
    `
      .avatar {
        background-size: cover;
      }

      .table-container {
        overflow: auto;
      }

      td.mat-cell {
        min-width: 150px;
      }

      td.mat-column-student {
        min-width: 230px;
      }

      th.mat-header-cell {
        .title {
          word-break: break-all;
          display: block;
        }
      }
    `,
  ],
  template: '<skooltrak-grades-page/>',
  providers: [],
})
export class GradesComponent {}
