import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseMessage, Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CourseMessageService } from 'src/app/shared/services/course-messages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-courses-messages',
  templateUrl: './courses-messages.component.html',
  styleUrls: ['./courses-messages.component.sass']
})
export class CoursesMessagesComponent implements OnInit {
  @Input() course: Course;
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 2,
    height: 150,
    uploadImagePath: '',
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontsize', 'color']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ]
  };
  form: FormGroup;
  messages: Observable<CourseMessage[]>;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private session: SessionService,
    private translate: TranslateService,
    private messagesService: CourseMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      teacher: [this.session.currentUser.people[0]],
      course: [this.course]
    });
    this.messages = this.coursesService.getMessages(this.course.id);
  }

  sendMessage() {
    this.messagesService.create(this.form.value).subscribe(res => {
      Swal.fire(this.translate.instant('Sent message'), '', 'success');
      this.messages = this.coursesService.getMessages(this.course.id);
      this.form.get('content').setValue('');
    });
  }
}
