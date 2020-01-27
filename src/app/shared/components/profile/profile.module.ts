import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}
0
