import { Component } from '@angular/core';

import { StorageService } from './shared/services/storage.service';
import { UpdateService } from './shared/services/update.service';

@Component({
  selector: 'skooltrak-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(public update: UpdateService, private storage: StorageService) {
    storage.clean();
  }
}
