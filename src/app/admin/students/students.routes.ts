import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'New', component: StudentNewComponent },
  { path: ':id', component: StudentDetailsComponent },
  { path: ':id/Edit', component: StudentEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class StudentsRoutingModule {}
