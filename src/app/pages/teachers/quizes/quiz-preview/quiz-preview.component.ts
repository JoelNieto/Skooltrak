import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/models/quizes.model';

@Component({
  selector: 'app-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.sass']
})
export class QuizPreviewComponent implements OnInit {
  @Input() quiz: Quiz;
  constructor() { }

  ngOnInit() {
  }

}
