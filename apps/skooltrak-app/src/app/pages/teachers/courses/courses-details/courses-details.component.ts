import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.sass'],
})
export class CoursesDetailsComponent implements OnInit {
  course: Course;

  constructor(
    private route: ActivatedRoute,
    public storage: StorageService,
    public coursesService: CoursesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (response) => {
        this.course = response.course;
      },
      error: (err) => console.error(err),
    });
  }

  updateCourse(course: Course) {
    this.coursesService.edit(course.id, course).subscribe({
      next: () => {
        Swal.fire(
          course.name,
          this.transloco.translate('Course updated'),
          'success'
        );
      },
      error: (err) => console.error(err),
    });
  }
}
