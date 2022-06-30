import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { addMinutes, getDate, getMonth, getYear } from 'date-fns';
import { Observable } from 'rxjs';
import { Exam, ExamAssignation } from 'src/app/shared/models/exams.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { ExamAssignationsService } from 'src/app/shared/services/exam-assignations.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-assignation',
  templateUrl: './assignation.component.html',
  styleUrls: ['./assignation.component.sass'],
})
export class AssignationComponent implements OnInit {
  @Input() assignation: ExamAssignation;
  @Input() exam: Exam;

  assignationForm: UntypedFormGroup;
  groups$: Observable<ClassGroup[]>;
  startHours = { hour: 7, minute: 0 };
  endHours = { hour: 17, minute: 0 };
  constructor(
    private fb: UntypedFormBuilder,
    private coursesService: CoursesService,
    private session: SessionService,
    private assignationService: ExamAssignationsService,
    private transloco: TranslocoService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.assignation) {
      this.groups$ = this.coursesService.getGroups(this.assignation.course.id);
    } else {
      this.groups$ = this.coursesService.getGroups(this.exam.course.id);
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
      exam: [
        this.assignation ? this.assignation.exam : this.exam,
        [Validators.required],
      ],
      minutes: [this.assignation ? this.assignation.minutes : 0],
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
      teacher: [
        this.assignation
          ? this.assignation.teacher
          : this.session.currentTeacher,
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
    const assignation: ExamAssignation = this.assignationForm.value;
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
      this.assignationService.edit(this.assignation.id, assignation).subscribe({
        next: () => {
          Swal.fire(
            assignation.title,
            this.transloco.translate('Updated itemf', {
              value: this.transloco.translate('Assignation'),
            }),
            'success'
          );
          this.modal.close();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.assignationService.create(assignation).subscribe({
        next: (res) => {
          Swal.fire(this.transloco.translate('Quiz assigned'), '', 'success');
          this.modal.close();
        },
        error: (err) => console.error(err),
      });
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}