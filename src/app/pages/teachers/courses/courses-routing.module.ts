import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseResolver } from 'src/app/shared/resolvers/course.resolver';

import { ClassroomPageComponent } from './classroom-page/classroom-page.component';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: ':id',
    component: CoursesDetailsComponent,
    resolve: {
      course: CourseResolver,
    },
  },
  { path: 'rooms/:id', component: ClassroomPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
