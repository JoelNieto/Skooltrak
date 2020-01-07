import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'skooltrak-app';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es');
  }
}
