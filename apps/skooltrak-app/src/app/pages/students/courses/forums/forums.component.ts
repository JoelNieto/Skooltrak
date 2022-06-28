import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Forum } from 'src/app/shared/models/forums.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'skooltrak-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.sass'],
})
export class ForumsComponent implements OnInit {
  @Input() course: Course;
  forums$: Observable<Forum[]>;
  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.forums$ = this.coursesService.getForums(this.course.id);
  }

  gotoForum(id: string) {
    this.router.navigate(['/student', 'forums', id]);
  }
}
