import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  course$: Observable<Course>;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.course$ = this.coursesService.get(params.id);
      },
      (err) => console.error(err)
    );
  }
}
