import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Course } from '../models/studyplans.model';
import { CoursesService } from '../services/courses.service';

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private service: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.get(route.paramMap.get('id'));
  }
}
