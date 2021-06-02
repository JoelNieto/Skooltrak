import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Course } from '../../models/studyplans.model';
import { CoursesService } from '../../services/courses.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.sass'],
})
export class CourseEditComponent implements OnInit {
  @Input() course: Course;
  constructor(
    public modal: NgbActiveModal,
    public storage: StorageService,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {}

  changeIcon(icon: string) {
    this.courseService.changeIcon(this.course.id, icon).subscribe(
      () => {
        this.course.icon = icon;
      },
      (err) => console.log(err)
    );
  }
  changeColor(color: string) {
    this.courseService.changeColor(this.course.id, color).subscribe(
      () => {
        this.course.color = color;
      },
      (err) => console.log(err)
    );
  }
}
