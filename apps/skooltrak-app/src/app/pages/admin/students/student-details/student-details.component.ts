import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.sass'],
})
export class StudentDetailsComponent implements OnInit {
  student: Student;
  state: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService
  ) {
    this.state = this.router.getCurrentNavigation().extras?.state;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(mergeMap((params) => this.studentService.get(params.id)))
      .subscribe({
        next: (student) => {
          if (this.state?.activate) {
            student.active = true;
          }
          this.student = student;
        },
        error: (err) => console.error(err),
      });
  }
}