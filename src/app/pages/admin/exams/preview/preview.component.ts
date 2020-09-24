import { Component, Input, OnInit } from '@angular/core';
import { Exam, ExamQuestion } from 'src/app/shared/models/exams.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass'],
})
export class PreviewComponent implements OnInit {
  @Input() exam: Exam;

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

  ngOnInit(): void {}

  selectMatch(question: ExamQuestion, index: number): void {
    question.matchList[index].selected = !question.matchList[index].selected;
  }
}
