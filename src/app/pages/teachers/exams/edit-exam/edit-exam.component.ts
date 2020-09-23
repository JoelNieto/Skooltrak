import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
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
    this.route.params.subscribe((params) => {
      this.examsService.get(params.id).subscribe((res) => {
        this.isOwner = this.session.currentTeacher.id === res.teacher?.id;
        this.exam = res;
      });
    });
  }

  saveExam(exam: Exam) {
    this.examsService.edit(exam.id, exam).subscribe(() => {
      Swal.fire(
        exam.title,
        this.translate.translate('Updated item', {
          value: this.translate.translate('Quiz'),
        }),
        'success'
      );
      this.router.navigate(['./'], { relativeTo: this.route.parent });
    });
  }
}
