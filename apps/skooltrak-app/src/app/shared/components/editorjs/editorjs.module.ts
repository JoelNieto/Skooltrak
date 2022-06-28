import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EditorViewComponent } from './editor-view/editor-view.component';
import { EditorjsComponent } from './editorjs.component';

@NgModule({
  declarations: [EditorjsComponent, EditorViewComponent],
  imports: [CommonModule, FormsModule],
  exports: [EditorjsComponent, EditorViewComponent],
})
export class EditorjsModule {}
