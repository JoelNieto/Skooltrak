import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamQuestion } from 'src/app/shared/models/exams.model';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.sass']
})
export class MatchFormComponent implements OnInit {
  @Input() question: ExamQuestion;
  matches: string[];
  options: string[] = [];
  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    this.matches = this.question.matchList.map((x) => {
      x.selectedMatch = [];
      return x.optionText;
    });
    this.options = this.shuffle(
      this.question.matchList.map((x) => x.correctMatch)
    );
  }

  dropped(event: CdkDragDrop<string[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    console.log(this.question);
  }

  shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let temporaryValue: string;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
