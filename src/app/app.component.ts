import { Component } from '@angular/core';

import { UpdateService } from './shared/services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'skooltrak-app';
  constructor(private update: UpdateService) {}
}
