import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ClassroomPageComponent } from './classroom-page/classroom-page.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: ':id', component: CourseDetailsComponent },
  { path: 'rooms/:id', component: ClassroomPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
