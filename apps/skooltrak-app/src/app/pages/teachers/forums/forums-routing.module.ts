import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumsPageComponent } from './forums-page/forums-page.component';
import { ForumsComponent } from './forums.component';

const routes: Routes = [
  { path: '', component: ForumsComponent },
  { path: ':id', component: ForumsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumsRoutingModule {}
