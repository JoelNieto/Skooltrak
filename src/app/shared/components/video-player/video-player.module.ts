import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomSelectModule } from '@skooltrak/custom-components';

import { SharedModule } from '../../shared.module';
import { ModalPlayerComponent } from './modal-player/modal-player.component';
import { UploaderComponent } from './uploader/uploader.component';
import { VideoPlayerComponent } from './video-player.component';

@NgModule({
  declarations: [VideoPlayerComponent, UploaderComponent, ModalPlayerComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    TranslocoModule,
    ReactiveFormsModule,
    CustomSelectModule,
    FormsModule,
    SharedModule,
  ],
  exports: [VideoPlayerComponent, UploaderComponent, ModalPlayerComponent],
})
export class VideoPlayerModule {}
