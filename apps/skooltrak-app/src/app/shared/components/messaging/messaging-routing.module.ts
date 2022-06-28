import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessagingComponent } from './messaging.component';
import { OutboxComponent } from './outbox/outbox.component';
import { TrashComponent } from './trash/trash.component';

const routes: Routes = [
  {
    path: '',
    component: MessagingComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'outbox', component: OutboxComponent },
      { path: 'trash', component: TrashComponent },
      { path: ':id', component: DetailsComponent },
      { path: '', redirectTo: 'inbox' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagingRoutingModule {}
