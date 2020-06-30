import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { FileInfo } from 'src/app/shared/models/documents.model';
import {
  Message,
  Receiver,
  MessageInbox,
} from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/users.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import Swal from 'sweetalert2';

import { ContactsComponent } from '../contacts/contacts.component';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { environment } from 'src/environments/environment';

interface Attachment extends File {
  uploaded?: true;
}

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.sass'],
})
export class ComposeComponent implements OnInit {
  @Input() message: Message;
  @Input() replyMessage: MessageInbox;

  files: Attachment[] = [];
  attacheds: FileInfo[] = [];
  messageForm: FormGroup;
  contacts: Observable<User[]>;
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 200,
    minHeight: 100,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['para', ['ul', 'ol']],
      ['insert', ['picture', 'link', 'video']],
      ['view', ['help', 'code']],
    ],
  };
  constructor(
    public active: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private messageService: MessagesService,
    private fileService: FilesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      id: [this.message ? this.message.id : ''],
      title: [this.message ? this.message.title : '', [Validators.required]],
      attached: [this.message ? this.message.attached : []],
      receivers: [
        this.message ? this.message.receivers : [],
        [Validators.required],
      ],
      content: [
        this.message ? this.message.content : '',
        [Validators.required],
      ],
    });
    if (this.replyMessage) {
      console.log(this.replyMessage);
      this.messageForm
        .get('title')
        .setValue(`RE: ${this.replyMessage.message.title}`);
      const quote = document.createElement('div');
      quote.append(document.createElement('br'));
      quote.append(document.createElement('hr'));
      quote.append(
        `${format(
          new Date(this.replyMessage.message.sendDate),
          'iiii d \'de\' MMMM \'de\' yyyy, h:m aaaa',
          { locale: es }
        )} - ${this.replyMessage.message.sender.displayName} escribió:`
      );
      quote.append(document.createElement('br'));
      quote.append(document.createElement('br'));
      quote.append(this.replyMessage.message.content);
      this.messageForm.get('content').setValue(quote);
      this.messageForm
        .get('receivers')
        .setValue([this.replyMessage.message.sender]);
    }

    if (this.message) {
      console.log(this.message);
      this.messageForm
        .get('title')
        .setValue(`RE: ${this.message.title}`);
      const quote = document.createElement('div');
      quote.append(document.createElement('br'));
      quote.append(document.createElement('hr'));
      quote.append(
        `${format(
          new Date(this.message.sendDate),
          'iiii d \'de\' MMMM \'de\' yyyy, h:m aaaa',
          { locale: es }
        )} - ${this.message.sender.displayName} escribió:`
      );
      quote.append(document.createElement('br'));
      quote.append(document.createElement('br'));
      quote.append(this.message.content);
      this.messageForm.get('content').setValue(quote);
      this.messageForm
        .get('receivers')
        .setValue([this.message.sender]);
    }
    this.contacts = this.messageService.getContacts();
  }

  setFile(event: any): void {
    event.preventDefault();
    const element: HTMLElement = document.getElementById('attach-file');
    element.click();
  }

  addAttachment(file: any): void {
    const files = file.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size / 1024 / 1024 > 5) {
        Swal.fire(
          this.transloco.translate('File not allowed'),
          this.transloco.translate('This file has to be less than 5MB'),
          'warning'
        );
      } else {
        const current = this.files.push(files[i]);
        this.fileService.uploadAttachment(files[i]).subscribe(
          (res) => {
            this.files[current - 1].uploaded = true;
            this.attacheds.push(res);
            this.messageForm.get('attached').setValue(this.attacheds);
          },
          (err: Error) => {
            console.log(err.message);
          }
        );
      }
    }
  }

  selectContacts() {
    const modalRef = this.modal.open(ContactsComponent, { size: 'xl' })
    modalRef.result.then(
      (receivers: Receiver[]) => {
        this.messageForm.get('receivers').setValue(receivers);
      },
      () => {}
    );
    modalRef.componentInstance.currentValue = this.messageForm.get('receivers').value;
  }

  removeAttachment(index: number) {
    this.fileService.deleteFile(this.attacheds[index].id).subscribe();
    this.attacheds.splice(index, 1);
    this.files.splice(index, 1);
    this.messageForm.get('attached').setValue(this.attacheds);
  }
}
