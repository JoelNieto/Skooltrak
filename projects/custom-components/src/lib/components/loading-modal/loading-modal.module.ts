import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';

import { LoadingModalComponent } from './loading-modal.component';

@NgModule({
  imports: [LottieModule],
  declarations: [LoadingModalComponent],
  exports: [LoadingModalComponent],
})
export class LoadingModalModule {}
