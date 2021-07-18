import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { EMPTY, Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import Swal from 'sweetalert2';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
@Injectable({ providedIn: 'root' })
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
    private transloco: TranslocoService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      setHeaders: { 'X-Request-Timeout': `${this.defaultTimeout}` },
    });

    return next.handle(request).pipe(
      timeout(this.defaultTimeout),
      catchError((err: HttpErrorResponse) => {
        if (err instanceof TimeoutError) {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate('Timeout request'),
            'error'
          );
          return EMPTY;
        }
        return throwError(err);
      })
    );
  }
}
