import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseMessage } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {
  @Input() course: Course;
  messages: Observable<CourseMessage[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.messages = this.coursesService.getMessages(this.course.id);
  }
}
