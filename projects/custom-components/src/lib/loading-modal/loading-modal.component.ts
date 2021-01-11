import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'sk-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.sass'],
})
export class LoadingModalComponent {
  options: AnimationOptions = {
    path: '/assets/animations/loading-books.json',
  };
}
