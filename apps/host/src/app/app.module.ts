import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccessInterceptor } from '@skooltrak-app/auth';
import { auth } from '@skooltrak-app/state';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';
import { NgxSpinnerModule } from 'ngx-spinner';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

const translateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
    }),
    MatNativeDateModule,
    HttpClientModule,

    QuillModule.forRoot({
      placeholder: 'Inserte texto',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button

          ['link', 'image', 'video'],
        ],
      },
    }),
    QuillConfigModule.forRoot({
      modules: {
        syntax: true,
      },
    }),
    NgxSpinnerModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('@skooltrak-app/auth').then((m) => m.AUTH_ROUTES),
        },
        {
          path: 'admin',
          loadChildren: () =>
            import('admin/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'student',
          loadChildren: () =>
            import('student/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'teacher',
          loadChildren: () =>
            import('teacher/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'auth',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    StoreModule.forRoot(
      { auth: auth.reducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([auth.AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
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
    { provide: HTTP_INTERCEPTORS, useClass: AccessInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
