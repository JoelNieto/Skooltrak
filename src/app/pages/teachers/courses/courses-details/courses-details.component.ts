import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.sass'],
})
export class CoursesDetailsComponent implements OnInit {
  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    public storage: StorageService,
    public coursesService: CoursesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.course$ = this.coursesService.get(params.id);
      },
      (err) => console.error(err)
    );
  }

  updateCourse(course: Course) {
    this.coursesService.edit(course.id, course).subscribe(
      () => {
        Swal.fire(
          course.name,
          this.transloco.translate('Course updated'),
          'success'
        );
      },
      (err) => console.error(err)
    );
  }
}
