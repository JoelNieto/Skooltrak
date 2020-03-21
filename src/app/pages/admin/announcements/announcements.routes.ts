import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnouncementsComponent } from './announcements.component';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';

const routes: Routes = [
  { path: '', component: AnnouncementsComponent },
  { path: 'new', component: NewAnnouncementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AnnouncementsRoutingModule {}
