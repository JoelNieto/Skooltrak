import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamQuestion } from 'src/app/shared/models/exams.model';

@Component({
  selector: 'app-preview-match',
  templateUrl: './preview-match.component.html',
  styleUrls: ['./preview-match.component.sass'],
})
export class PreviewMatchComponent implements OnInit {
  @Input() question: ExamQuestion;
  matches: string[];
  options: string[] = [];

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {
    this.matches = this.question.matchList.map((x) => {
      x.selectedMatch = [];
      return x.optionText;
    });
    this.options = this.shuffle(
      this.question.matchList.map((x) => x.correctMatch)
    );
  }

  open(content: any, index: number) {
    this.modal.open(content, { size: 'lg' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      }
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
