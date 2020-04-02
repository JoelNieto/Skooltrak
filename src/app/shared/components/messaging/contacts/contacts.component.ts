import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/users.model';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactsComponent),
      multi: true
    }
  ]
})
export class ContactsComponent implements OnInit {
  currentValue: any[];
  filterValue: string;
  filteredItems: any[];

  items: Observable<User[]>;
  table = new TableOptions('select');
  constructor(
    private messageService: MessagesService,
    private transloco: TranslocoService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'displayName',
        title: this.transloco.translate('Name'),
        filterable: true
      },
      {
        name: 'role',
        title: this.transloco.translate('Role'),
        type: 'object',
        lookup: true
      }
    ];
    this.items = this.messageService.getContacts();
    this.currentValue = [];
  }
}
