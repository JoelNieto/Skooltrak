import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SessionService } from '../services/session.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private session: SessionService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const request = req.clone({
      setHeaders: {
        userId: this.session.currentUser ? this.session.currentUser.id : '',
      },
    });
    return next.handle(request);
  }
}
