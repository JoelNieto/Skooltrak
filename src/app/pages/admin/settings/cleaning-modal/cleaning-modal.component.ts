import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CleaningItem } from 'src/app/shared/models/cleaning.model';

@Component({
  selector: 'app-cleaning-modal',
  templateUrl: './cleaning-modal.component.html',
  styleUrls: ['./cleaning-modal.component.sass'],
})
export class CleaningModalComponent {
  @Input() items$: Observable<CleaningItem[]>;

  selection: CleaningItem[] = [];
  constructor(public modal: NgbActiveModal) {}

  toggleSelection(item: CleaningItem) {
    if (this.selection.find((x) => x.code === item.code)) {
      this.selection = this.selection.filter((x) => x.code !== item.code);
    } else {
      this.selection.push(item);
    }
  }

  isSelected(id: string) {
    return this.selection.find((x) => x.code === id);
  }
}
