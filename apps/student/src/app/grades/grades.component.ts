import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'skooltrak-grades',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      grades works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradesComponent {

}
