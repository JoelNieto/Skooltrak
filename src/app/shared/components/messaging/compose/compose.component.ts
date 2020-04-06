import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Message, Receiver } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/users.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import Swal from 'sweetalert2';
import { FilesService } from 'src/app/shared/services/files.service';
import { FileInfo } from 'src/app/shared/models/documents.model';
import { ContactsComponent } from '../contacts/contacts.component';

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
    uploadImagePath: '',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['para', ['ul', 'ol']],
      ['insert', ['picture', 'link', 'video']],
      ['view', ['help']],
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
      receivers: [this.message ? this.message.receivers : [], [Validators.required]],
      content: [this.message ? this.message.content : '', [Validators.required]],
    });
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
    this.modal.open(ContactsComponent, { size: 'xl' }).result.then(
      (receivers: Receiver[]) => {
        this.messageForm.get('receivers').setValue(receivers);
      },
      () => {}
    );
  }

  removeAttachment(index: number) {
    this.fileService.deleteFile(this.attacheds[index].id).subscribe();
    this.attacheds.splice(index, 1);
    this.files.splice(index, 1);
    this.messageForm.get('attached').setValue(this.attacheds);
  }
}
