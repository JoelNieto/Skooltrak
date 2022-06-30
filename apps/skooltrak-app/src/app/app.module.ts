import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-PA';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { popperVariation, TippyModule, tooltipVariation } from '@ngneat/helipopper';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LottieModule } from 'ngx-lottie';
import { NgxSummernoteModule } from 'ngx-summernote';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { TranslocoRootModule } from './transloco-root.module';

registerLocaleData(localeEs, 'es-PA');

const customTooltipVariation = () => {
  const item = tooltipVariation;
  item.theme = 'light';
  return item;
};
const customPopperVariation = () => {
  const item = popperVariation;
  item.theme = 'light';
  return item;
};

const playerFactory = () =>
  import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),
    NgxSummernoteModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ScrollingModule,
    TranslocoRootModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    LottieModule.forRoot({ player: playerFactory }),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: customTooltipVariation(),
        popper: customPopperVariation(),
      },
    }),
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    { provide: LOCALE_ID, useValue: 'es-PA' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}