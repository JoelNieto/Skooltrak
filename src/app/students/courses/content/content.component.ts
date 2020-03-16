import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from 'src/app/shared/models/content.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
  @Input() course: Course;

  $contents: Observable<Content[]>;
  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.$contents = this.courseService.getContent(this.course.id);
  }
}
