import { Component, Input } from '@angular/core';
import { ContentBlock } from 'src/app/shared/models/editor-content.model';

@Component({
  selector: 'skooltrak-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.sass'],
})
export class EditorViewComponent {
  @Input() blocks: ContentBlock[];
  constructor() {}
}
