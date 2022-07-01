import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacade } from 'libs/state/src/lib/auth';
import { first, Observable, switchMap } from 'rxjs';

@Injectable()
export class AccessInterceptor implements HttpInterceptor {
  constructor(private readonly auth: AuthFacade) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.auth.token$.pipe(
      first(),
      switchMap((token) => {
        const request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(request);
      })
    );
  }
}
