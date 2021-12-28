import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Course, CourseMessage } from 'src/app/shared/models/studyplans.model';
import { CourseMessageService } from 'src/app/shared/services/course-messages.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-courses-messages',
  templateUrl: './courses-messages.component.html',
  styleUrls: ['./courses-messages.component.sass'],
})
export class CoursesMessagesComponent implements OnInit {
  @Input() course: Course;
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 100,
    minHeight: 100,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['view', ['help']],
    ],
  };
  form: FormGroup;
  messages$: Observable<CourseMessage[]>;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private session: SessionService,
    private translate: TranslocoService,
    private messagesService: CourseMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      teacher: [this.session.currentUser.people[0]],
      course: [this.course],
    });
    this.messages$ = this.coursesService.getMessages(this.course.id);
  }

  sendMessage() {
    this.messagesService.create(this.form.value).subscribe({
      next: (res) => {
        Swal.fire(this.translate.translate('Sent message'), '', 'success');
        this.messages$ = this.coursesService.getMessages(this.course.id);
        this.form.get('content').setValue('');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
