import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Exam } from 'src/app/shared/models/exams.model';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

import { ExamsFormComponent } from '../exams-form/exams-form.component';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.sass'],
})
export class NewExamComponent implements OnInit {
  constructor(
    private examsService: ExamsService,
    private transloco: TranslocoService,
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  @ViewChild(ExamsFormComponent) form: ExamsFormComponent;
  ngOnInit(): void {}

  createExam(exam: Exam) {
    exam.teacher = this.session.currentTeacher;
    this.examsService.create(exam).subscribe(
      (res) => {
        Swal.fire(
          res.title,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('Exam'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
        this.form.saving = false;
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
        this.form.saving = false;
      }
    );
  }
}