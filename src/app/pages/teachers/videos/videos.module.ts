import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { VideoPlayerModule } from 'src/app/shared/components/video-player/video-player.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';

@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    VideosRoutingModule,
    NgbModalModule,
    TranslocoModule,
    VideoPlayerModule,
    CustomComponentsModule,
    SharedModule
  ]
})
export class VideosModule { }
