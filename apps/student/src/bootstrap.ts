import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        {
          path: '',
          loadChildren: () =>
            import('./app/remote-entry/entry.module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      withEnabledBlockingInitialNavigation()
    ),
    importProvidersFrom(BrowserModule),
  ],
});
