import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'skooltrak-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.sass'],
})
export class MatchFormComponent {
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
      ['insert', ['picture']],
    ],
  };

  constructor() {}

  clickAdd() {
    this.addOption.emit(this.group);
  }

  clickRemove(i: number) {
    this.removeOption.emit(i);
  }
}
