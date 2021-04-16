import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassroomPageComponent } from './classroom-page/classroom-page.component';
import { CoursesComponent } from './courses.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: ':id', component: DetailsComponent },
  { path: 'rooms/:id', component: ClassroomPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class CoursesRoutingModule {}
