import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';

import { ForumsPageComponent } from './forums-page/forums-page.component';
import { ForumsRoutingModule } from './forums-routing.module';
import { ForumsComponent } from './forums.component';


@NgModule({
  declarations: [ForumsComponent, ForumsPageComponent],
  imports: [
    CommonModule,
    ForumsRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslocoModule
  ]
})
export class ForumsModule {}
