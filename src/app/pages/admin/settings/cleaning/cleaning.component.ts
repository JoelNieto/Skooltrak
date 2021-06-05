import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CleaningItem } from 'src/app/shared/models/cleaning.model';
import { CleaningService } from 'src/app/shared/services/cleaning.service';
import Swal from 'sweetalert2';

import { CleaningModalComponent } from '../cleaning-modal/cleaning-modal.component';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.sass'],
})
export class CleaningComponent implements OnInit {
  items$: Observable<CleaningItem[]>;

  constructor(
    private cleaningService: CleaningService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.items$ = this.cleaningService.getItems();
  }

  selectItems() {
    const modalRef = this.modal.open(CleaningModalComponent, {
      centered: true,
    });
    modalRef.result.then((items: CleaningItem[]) => {
      this.cleaningService.runCleaning(items).subscribe(
        () => {
          Swal.fire('Limpieza exitosa!', '', 'success');
          this.items$ = this.cleaningService.getItems();
        },
        (err) => console.error(err)
      );
    });

    modalRef.componentInstance.items$ = this.items$;
  }
}
