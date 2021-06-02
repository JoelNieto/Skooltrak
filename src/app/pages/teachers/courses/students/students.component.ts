import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass'],
})
export class StudentsComponent implements OnInit {
  @Input() course: Course;
  students$: Observable<Student[]>;
  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.students$ = this.coursesService.getStudents(this.course.id);
  }
}
