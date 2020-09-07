import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Course } from 'src/app/shared/models/studyplans.model';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Period } from 'src/app/shared/models/periods.model';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  @Input() student: Student;

  courses: Observable<Course[]>;
  $periods: Observable<Period[]>;
  constructor(
    private studentsService: StudentsService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.courses = this.studentsService.getCourses(this.student.id);
    this.$periods = this.storage.getFromStorage(StorageEnum.Periods);
  }

  print() {}
}
