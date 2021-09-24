import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Incident } from 'src/app/shared/models/incidents.model';
import { Student } from 'src/app/shared/models/students.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'skooltrak-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {
  @Input() incident: Incident;
  @Output() save = new EventEmitter<Incident>();

  form: FormGroup;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 2,
    height: 200,
    minHeight: 200,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['misc', ['undo', 'redo']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
  };
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private studentServices: StudentsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.incident ? this.incident.id : ''],
      title: [this.incident ? this.incident.title : '', [Validators.required]],
      student: [this.incident ? this.incident.student : []],
      course: [this.incident ? this.incident.course : null],
      details: [
        this.incident ? this.incident.details : '',
        [Validators.required],
      ],
      incidentDate: [
        this.incident ? this.incident.incidentDate : '',
        [Validators.required],
      ],
    });
    this.courses$ = this.coursesService.getAll();
    this.students$ = this.studentServices.getList();
  }

  saveIncident() {
    this.save.emit(this.form.value);
  }
}
