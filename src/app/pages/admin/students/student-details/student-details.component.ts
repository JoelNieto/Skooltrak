import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.sass']
})
export class StudentDetailsComponent implements OnInit {
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentService.get(params.id).subscribe(res => {
        this.student = res;
      });
    });
  }
}