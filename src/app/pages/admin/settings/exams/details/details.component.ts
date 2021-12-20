import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/shared/models/exams.model';
import { ExamsService } from 'src/app/shared/services/exams.service';

@Component({
  selector: 'skooltrak-exam-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  exam$: Observable<Exam>;
  constructor(
    private route: ActivatedRoute,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.exam$ = this.examsService.get(params.id);
      },
      error: (err) => console.error(err),
    });
  }
}
