import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoleType } from '../enums/role.enum';
import { StorageEnum } from '../enums/storage.enum';
import { User } from '../models/users.model';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivateChild {
  constructor(private storage: StorageService, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.storage.getFromStorage<User>(StorageEnum.User).pipe(
      map((res) => {
        if (!res || res.role.code !== RoleType.Student) {
          return this.router.createUrlTree(['/'], {
            queryParams: { redirectURL: state.url },
          });
        }
        return true;
      })
    );
  }
}
