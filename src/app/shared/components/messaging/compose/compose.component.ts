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
import { ContentBlock } from 'src/app/shared/models/editor-content.model';

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
      title: [this.message ? this.message.title : '', [Validators.required]],
      attached: [this.message ? this.message.attached : []],
      receivers: [
        this.message ? this.message.receivers : [],
        [Validators.required],
      ],
      contentBlocks: [this.message ? this.message.contentBlocks : []],
    });
    if (this.replyMessage) {
      this.messageForm
        .get('title')
        .setValue(`RE: ${this.replyMessage.reference?.title}`);
      this.messageForm
        .get('receivers')
        .setValue([this.replyMessage.reference?.sender]);
      console.log(this.replyMessage.reference?.contentBlocks);
      if (!this.replyMessage.reference?.contentBlocks) {
        this.replyMessage.reference.contentBlocks = [
          {
            type: 'paragraph',
            data: { text: this.replyMessage.reference?.content },
          },
        ];
      }
      const header: ContentBlock[] = [];
      header.push({
        type: 'paragraph',
        data: {
          text: `<b>De: </b> ${this.replyMessage.reference?.sender.displayName}`,
        },
      });
      header.push({
        type: 'paragraph',
        data: {
          text: `<b>Enviado: </b> ${format(
            new Date(this.replyMessage.arrivalDate),
            'iiii d \'de\' MMMM \'de\' yyyy, h:m aaaa',
            { locale: es }
          )}`,
        },
      });
      header.push({
        type: 'paragraph',
        data: {
          text: `<b>Asunto: </b> ${this.replyMessage.reference?.title}`,
        },
      });

      this.replyMessage.reference?.contentBlocks.unshift(...header);

      this.replyMessage.reference?.contentBlocks.unshift({
        type: 'delimiter',
        data: {},
      });
      this.replyMessage.reference?.contentBlocks.unshift({
        type: 'paragraph',
        data: { text: '' },
      });

      this.messageForm
        .get('contentBlocks')
        .setValue(this.replyMessage.reference?.contentBlocks);
    }

    if (this.message) {
      const content = document.createElement('div');
      content.innerHTML = this.message.content;
      this.messageForm.get('title').setValue(`RE: ${this.message.title}`);
      if (!this.message.contentBlocks) {
        this.message.contentBlocks = [
          {
            type: 'paragraph',
            data: { text: this.message.content },
          },
        ];
      }
      const header: ContentBlock[] = [];
      header.push({
        type: 'paragraph',
        data: {
          text: `<b>De: </b> ${this.message.sender.displayName}`,
        },
      });

      header.push({
        type: 'paragraph',
        data: {
          text: `<b>Enviado: </b> ${format(
            new Date(this.message.sendDate),
            'iiii d \'de\' MMMM \'de\' yyyy, h:m aaaa',
            { locale: es }
          )}`,
        },
      });
      header.push({
        type: 'paragraph',
        data: {
          text: `<b>Asunto: </b> ${this.message.title}`,
        },
      });

      this.message.contentBlocks.unshift(...header);

      this.message.contentBlocks.unshift({
        type: 'delimiter',
        data: {},
      });
      this.message.contentBlocks.unshift({
        type: 'paragraph',
        data: { text: '' },
      });

      this.messageForm
        .get('contentBlocks')
        .setValue(this.message.contentBlocks);
      this.messageForm.get('receivers').setValue([this.message.sender]);
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
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
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

  sendMessage(message: Message) {
    Swal.fire({
      title: 'Enviando',
      html: 'Espere un momento...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    message.status = 1;
    this.messageService.create(message).subscribe(
      (res) => {
        this.active.close(message);
        Swal.close();
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          err.message,
          'error'
        );
      }
    );
  }

  selectContacts() {
    const modalRef = this.modal.open(ContactsComponent, { size: 'xl' });
    modalRef.result.then(
      (receivers: Receiver[]) => {
        this.messageForm.get('receivers').setValue(receivers);
      },
      () => {}
    );
    modalRef.componentInstance.currentValue = this.messageForm.get(
      'receivers'
    ).value;
  }

  removeAttachment(index: number) {
    this.fileService.deleteFile(this.attacheds[index].id).subscribe();
    this.attacheds.splice(index, 1);
    this.files.splice(index, 1);
    this.messageForm.get('attached').setValue(this.attacheds);
  }
}
