import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Course } from 'src/app/shared/models/studyplans.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  @Input() student: Student;

  courses: Observable<Course[]>;
  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.courses = this.studentsService.getCourses(this.student.id);
  }
}
