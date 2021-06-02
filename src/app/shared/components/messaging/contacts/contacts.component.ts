import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { CustomTableComponent, TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Receiver } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactsComponent),
      multi: true,
    },
  ],
})
export class ContactsComponent implements OnInit {
  @Input() currentValue: any[];
  @ViewChild(CustomTableComponent) contactsTable: CustomTableComponent;
  filterValue: string;
  filteredItems: any[];

  items$: Observable<Receiver[]>;
  table = new TableOptions('select');
  teachersTable = new TableOptions('select');
  studentsTable = new TableOptions('select');
  adminTable = new TableOptions('select');
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
        filterable: true,
      },
      {
        name: 'role',
        title: this.transloco.translate('Role'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'description',
        title: this.transloco.translate('Description'),
        type: 'text',
      },
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        type: 'object',
        lookup: true,
      },
    ];
    this.items$ = this.messageService.getReceivers();
    this.currentValue = [];
  }

  initTeachersTable() {
    this.teachersTable.lookup = true;
    this.teachersTable.pageSize = 5;
    this.teachersTable.columns = [
      {
        name: 'name',
        title: this.transloco.translate('Name'),
        filterable: true,
      },
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        type: 'object',
        lookup: true,
      },
    ];
  }

  initStudentsTable() {
    this.studentsTable.lookup = true;
    this.studentsTable.pageSize = 5;
    this.studentsTable.columns = [
      {
        name: 'name',
        title: this.transloco.translate('Name'),
        filterable: true,
      },
      {
        name: 'description',
        title: this.transloco.translate('Description'),
        type: 'text',
      },
    ];
  }

  initAdminTable() {
    this.adminTable.lookup = true;
    this.adminTable.pageSize = 5;
    this.adminTable.columns = [
      {
        name: 'name',
        title: this.transloco.translate('Name'),
        filterable: true,
      },
      {
        name: 'description',
        title: this.transloco.translate('Description'),
        type: 'text',
      },
    ];
  }
}
