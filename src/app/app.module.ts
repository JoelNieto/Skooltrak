import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-PA';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import * as date_fns_2 from 'date-fns';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { NgxSummernoteModule } from 'ngx-summernote';
import { environment } from 'src/environments/environment';
import * as tslib_1 from 'tslib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco-root.module';

function adapterFactory() {
  return tslib_1.__assign(tslib_1.__assign({}), date_fns_2);
}

registerLocaleData(localeEs, 'es-PA');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSummernoteModule.forRoot(),
    SweetAlert2Module.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ScrollingModule,
    CanvasWhiteboardModule,
    TranslocoRootModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es-PA' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
