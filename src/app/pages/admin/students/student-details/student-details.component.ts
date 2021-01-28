import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-student-details',
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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.studentService.get(params.id).subscribe((res) => {
        if (this.state?.activate) {
          res.active = true;
        }
        this.student = res;
      });
    });
  }
}
