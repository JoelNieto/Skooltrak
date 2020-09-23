import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { QuestionEnum } from 'src/app/shared/enums/exams.enum';
import { QuestionType } from 'src/app/shared/models/exams.model';
@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.sass'],
})
export class QuestionFormComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() index: number;
  @Output() addOption = new EventEmitter<FormGroup>();
  @Output() removeOption = new EventEmitter<number>();
  @Output() addMatch = new EventEmitter<FormGroup>();
  @Output() removeMatch = new EventEmitter<number>();
  @Output() resetMatch = new EventEmitter<FormGroup>();

  types = QuestionEnum.QUESTION_TYPES;
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

  ngOnInit(): void {}

  clickAdd() {
    this.addOption.emit(this.group);
  }

  changeType(type: QuestionType) {
    if (type.code !== 5) {
      this.resetMatch.emit(this.group);
    }
  }

  compareType(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.code === c2.code : c1 === c2;
  }

  clickRemove(id: number) {
    this.removeOption.emit(id);
  }

  clickAddMatch() {
    this.addMatch.emit(this.group);
  }

  clickRemoveMatch(id: number) {
    this.removeMatch.emit(id);
  }
}
