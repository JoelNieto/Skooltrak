import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { FormComponent } from './form.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<FormComponent> {
  canDeactivate(
    component: FormComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      (component.seconds > 0 || component.result.minutes === 0) &&
      component.result.status < 2
    ) {
      return Swal.fire<boolean>({
        title: 'Aún tienes tiempo!',
        text:
          '¿Estás seguro de abandonar el examen? No podrás volver a intentarlo.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#A0AEC0',
        confirmButtonColor: '#E53E3E',
        cancelButtonText: 'Aún no',
        confirmButtonText: 'Sí, he terminado',
      }).then((res) => res.isConfirmed);
    } else {
      return true;
    }
  }
}

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Swal.fire<boolean>({
      title: 'Comenzando examen',
      text:
        '¿Estás seguro de iniciar el examen? No podrás salir hasta terminarlo.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#A0AEC0',
      confirmButtonColor: '#38A169',
      cancelButtonText: 'Aún no',
      confirmButtonText: 'Sí, empezar',
    }).then((res) => res.isConfirmed);
  }
}
