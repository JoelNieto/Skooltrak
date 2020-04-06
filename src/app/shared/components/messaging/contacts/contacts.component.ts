import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions, CustomTableComponent } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/users.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Receiver } from 'src/app/shared/models/message.model';

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
  @ViewChild(CustomTableComponent) contactsTable: CustomTableComponent;
  currentValue: any[];
  filterValue: string;
  filteredItems: any[];

  items: Observable<Receiver[]>;
  table = new TableOptions('select');
  constructor(
    private messageService: MessagesService,
    private transloco: TranslocoService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.pageSize = 5;
    this.table.columns = [
      {
        name: 'name',
        title: this.transloco.translate('Name'),
        filterable: true
      },
      {
        name: 'role',
        title: this.transloco.translate('Role'),
        type: 'object',
        lookup: true
      },
      {
        name: 'description',
        title: this.transloco.translate('Description')
      },
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        type: 'object',
        lookup: true
      }
    ];
    this.items = this.messageService.getReceivers();
    this.currentValue = [];
  }
}
