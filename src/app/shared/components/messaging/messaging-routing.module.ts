import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessagingComponent } from './messaging.component';
import { InboxComponent } from './inbox/inbox.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MessagingComponent,
    children: [
      { path: '', component: InboxComponent },
      { path: ':id', component: DetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagingRoutingModule {}
