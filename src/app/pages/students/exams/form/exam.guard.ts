import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { FormComponent } from './form.component';


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<FormComponent> {
  canDeactivate(
    component: FormComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.seconds > 0) {
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
      }).then((res) => {
        return res.isConfirmed;
      });
    } else {
      return true;
    }
  }
}
