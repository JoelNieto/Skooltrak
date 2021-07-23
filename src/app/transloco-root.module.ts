import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Translation, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['es', 'en'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoLoader },
  ],
})
export class TranslocoRootModule {}
