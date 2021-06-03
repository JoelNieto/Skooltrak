import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { mergeMap } from 'rxjs/operators';
import { Exam } from 'src/app/shared/models/exams.model';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.sass'],
})
export class EditExamComponent implements OnInit {
  exam: Exam;
  isOwner: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examsService: ExamsService,
    private translate: TranslocoService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(mergeMap((params) => this.examsService.get(params.id)))
      .subscribe(
        (exam) => {
          this.isOwner = this.session.currentTeacher.id === exam.teacher?.id;
          this.exam = exam;
        },
        (err) => console.log(err)
      );
  }

  saveExam(exam: Exam) {
    this.examsService.edit(exam.id, exam).subscribe(
      () => {
        Swal.fire(
          exam.title,
          this.translate.translate('Updated item', {
            value: this.translate.translate('Quiz'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err) => console.log(err)
    );
  }
}
