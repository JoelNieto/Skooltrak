import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class UpdateService {
  constructor(private update: SwUpdate, private transloco: TranslocoService) {
    if (!this.update.isEnabled) {
      console.warn('Nope 🙁');
    }
    this.update.available.subscribe(
      (evt) => {
        const TOAST = Swal.mixin({
          toast: true,
          position: 'bottom',
          confirmButtonText: this.transloco.translate('Reload'),
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        TOAST.fire({
          icon: 'info',
          title: this.transloco.translate('Update available'),
        }).then((result) => {
          if (result.value) {
            window.location.reload();
          }
        });
      },
      (err) => console.error(err)
    );
  }
}
