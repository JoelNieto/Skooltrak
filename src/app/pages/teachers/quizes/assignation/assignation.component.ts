import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { addMinutes, getDate, getMonth, getYear } from 'date-fns';
import { Observable } from 'rxjs';
import { Quiz, QuizAssignation } from 'src/app/shared/models/quizes.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { QuizesAssignationsService } from 'src/app/shared/services/quiz-assignations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignation',
  templateUrl: './assignation.component.html',
  styleUrls: ['./assignation.component.sass'],
})
export class AssignationComponent implements OnInit {
  @Input() assignation: QuizAssignation;
  @Input() quiz: Quiz;

  assignationForm: FormGroup;
  groups$: Observable<ClassGroup[]>;
  startHours = { hour: 7, minute: 0 };
  endHours = { hour: 17, minute: 0 };

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private assignationService: QuizesAssignationsService,
    private transloco: TranslocoService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.assignation) {
      this.groups$ = this.coursesService.getGroups(this.assignation.course.id);
    } else {
      this.groups$ = this.coursesService.getGroups(this.quiz.course.id);
    }
    this.assignationForm = this.fb.group({
      id: [this.assignation ? this.assignation.id : '', []],
      title: [
        this.assignation ? this.assignation.title : '',
        [Validators.required],
      ],
      group: [
        this.assignation ? this.assignation.group : '',
        [Validators.required],
      ],
      quiz: [
        this.assignation ? this.assignation.quiz : this.quiz,
        [Validators.required],
      ],
      startDate: [
        this.assignation ? this.assignation.startDate : '',
        [Validators.required],
      ],
      startHours: [
        this.assignation
          ? {
              hour: new Date(this.assignation.startDate).getHours(),
              minute: new Date(this.assignation.startDate).getMinutes(),
            }
          : this.startHours,
      ],
      endHours: [
        this.assignation
          ? {
              hour: new Date(this.assignation.endDate).getHours(),
              minute: new Date(this.assignation.endDate).getMinutes(),
            }
          : this.endHours,
      ],
      endDate: [
        this.assignation ? this.assignation.endDate : '',
        [Validators.required],
      ],
    });
  }

  save() {
    const assignation: QuizAssignation = this.assignationForm.value;
    const startHours = this.assignationForm.get('startHours').value;
    const endHours = this.assignationForm.get('endHours').value;
    assignation.startDate = new Date(assignation.startDate);
    assignation.endDate = new Date(assignation.endDate);
    assignation.startDate = addMinutes(
      assignation.startDate,
      assignation.startDate.getTimezoneOffset()
    );
    assignation.startDate = new Date(
      getYear(assignation.startDate),
      getMonth(assignation.startDate),
      getDate(assignation.startDate),
      startHours.hour,
      startHours.minute
    );

    assignation.endDate = addMinutes(
      assignation.endDate,
      assignation.endDate.getTimezoneOffset()
    );
    assignation.endDate = new Date(
      getYear(assignation.endDate),
      getMonth(assignation.endDate),
      getDate(assignation.endDate),
      endHours.hour,
      endHours.minute
    );
    if (this.assignation?.id) {
      this.assignationService.edit(this.assignation.id, assignation).subscribe(
        () => {
          Swal.fire(
            assignation.title,
            this.transloco.translate('Updated itemf', {
              value: this.transloco.translate('Assignation'),
            }),
            'success'
          );
          this.modal.close();
        },
        (err) => console.error(err)
      );
    } else {
      this.assignationService.create(assignation).subscribe(
        (res) => {
          Swal.fire(this.transloco.translate('Quiz assigned'), '', 'success');
          this.modal.close();
        },
        (err) => console.error(err)
      );
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
