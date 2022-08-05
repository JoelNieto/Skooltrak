import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'skooltrak-selection-options',
  templateUrl: './selection-options.component.html',
  styleUrls: ['./selection-options.component.sass'],
})
export class SelectionOptionsComponent {
  @Input() group: UntypedFormGroup;
  @Input() index: number;
  @Output() addOption = new EventEmitter<UntypedFormGroup>();
  @Output() removeOption = new EventEmitter<number>();

  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 50,
    minHeight: 50,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
        ],
      ],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['picture', 'link']],
    ],
  };
  constructor() {}

  clickAdd() {
    this.addOption.emit(this.group);
  }

  clickRemove(id: number) {
    this.removeOption.emit(id);
  }
}
