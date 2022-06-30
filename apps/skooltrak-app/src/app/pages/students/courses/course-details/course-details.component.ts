import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/studyplans.model';

@Component({
  selector: 'skooltrak-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.sass'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (response) => {
        this.course = response.course;
      },
      error: (err) => console.error(err),
    });
  }
}