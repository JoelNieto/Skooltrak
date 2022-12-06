import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeEs from '@angular/common/locales/es-PA';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, TitleStrategy } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccessInterceptor } from '@skooltrak-app/auth';
import { auth } from '@skooltrak-app/state';
import { PageTitleStrategy } from '@skooltrak-app/ui';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from './environments/environment';

registerLocaleData(localeEs, 'es-PA');

const translateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const providers = [
  { provide: MAT_DATE_LOCALE, useValue: 'es-PA' },
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    },
  },
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: {
      appearance: 'fill',
    },
  },
  { provide: TitleStrategy, useClass: PageTitleStrategy },
  { provide: HTTP_INTERCEPTORS, useClass: AccessInterceptor, multi: true },
  provideHttpClient(withInterceptorsFromDi()),
  provideStore(),
  provideState(auth.authFeatureKey, auth.reducer),
  provideEffects(auth.AuthEffects),
  provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
  provideRouterStore(),
  importProvidersFrom(
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [HttpClient],
      },
    }),
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgxSpinnerModule.forRoot(),
    ImageCropperModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('@skooltrak-app/auth').then((m) => m.AUTH_ROUTES),
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'auth',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    )
  ),
];
