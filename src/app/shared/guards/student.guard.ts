import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

import { RoleType } from '../enums/role.enum';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivateChild {
  constructor(private session: SessionService, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      !this.session.currentUser ||
      this.session.currentUser.role.code !== RoleType.Student
    ) {
      return this.router.createUrlTree(['/']);
    }
    return true;
  }
}
