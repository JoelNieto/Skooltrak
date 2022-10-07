import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'skooltrak-description-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex flex-column">
      <span class="small-text clear-text">{{ label }}</span>
      <div class="value" [innerHtml]="value"></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 0.2rem;
      }

      .value {
        min-height: 21px;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionItemComponent {
  @Input() label!: string;
  @Input() value!: string;
}
