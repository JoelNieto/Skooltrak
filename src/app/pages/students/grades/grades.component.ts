import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { GradesDetailsComponent } from './grades-details/grades-details.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  courses: Observable<Course[]>;
  public isCollapsed = true;

  constructor(
    public session: SessionService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.courses = this.studentsService.getCourses(
      this.session.currentStudent.id
    );
  }
}
