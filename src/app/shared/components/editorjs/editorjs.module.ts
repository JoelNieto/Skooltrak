import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EditorjsComponent } from './editorjs.component';

@NgModule({
  declarations: [EditorjsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [EditorjsComponent]
})
export class EditorjsModule { }
