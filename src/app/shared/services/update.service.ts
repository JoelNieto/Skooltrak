import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import Swal from 'sweetalert2';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class UpdateService {
  constructor(private update: SwUpdate, private transloco: TranslocoService) {
    if (!this.update.isEnabled) {
      console.log('Nope 🙁');
    }
    this.update.available.subscribe(evt => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        confirmButtonText: this.transloco.translate('Update'),
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'info',
        title: this.transloco.translate('Update available')
      }).then(result => {
        if (result.value) {
          window.location.reload();
        }
      });
    });
  }
}
