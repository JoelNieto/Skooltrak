import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { FileInfo } from 'src/app/shared/models/documents.model';
import { Message } from 'src/app/shared/models/message.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

import { ComposeComponent } from '../compose/compose.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  isOutbox = false;
  message$: Observable<Message>;
  details$: Observable<Message>;
  constructor(
    private messageService: MessagesService,
    private session: SessionService,
    private modal: NgbModal,
    private transloco: TranslocoService,
    public filesService: FilesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isOutbox = this.router.getCurrentNavigation().extras.state?.isOutbox;
  }

  ngOnInit(): void {
    const getOutbox = (id: string) => this.messageService.getMessageDetails(id);
    const getInbox = (id: string) =>
      this.messageService.getMessage(id).pipe(
        tap((inbox) => {
          if (!inbox.read) {
            this.setRead(inbox.id);
            this.session.currentInbox = this.messageService.getInbox();
            this.session.readMessage();
          }
        }),
        mergeMap((inbox) =>
          this.messageService.getMessageDetails(inbox.reference.id)
        )
      );
    this.message$ = this.route.params.pipe(
      mergeMap((params) => {
        if (this.isOutbox) {
          return getOutbox(params.id);
        } else {
          return getInbox(params.id);
        }
      })
    );
  }

  setRead = (id: string) => {
    this.messageService.setRead(id).subscribe(
      () => {},
      (err) => console.error(err)
    );
  };

  formatDate(date: Date) {
    return format(new Date(date), 'EEE, d MMM yyyy h:mm aaa', { locale: es });
  }

  replyMessage(original: Message) {
    const message = original;

    const modalRef = this.modal.open(ComposeComponent, {
      size: 'lg',
      beforeDismiss: async () => {
        const result = await Swal.fire<Promise<boolean>>({
          title: this.transloco.translate('Wanna discard this message?'),
          text: this.transloco.translate(
            'This cannot be reversed. The message will be gone permanently'
          ),
          icon: 'question',
          showCancelButton: true,
          cancelButtonColor: '#A0AEC0',
          confirmButtonColor: '#E53E3E',
          cancelButtonText: this.transloco.translate('Cancel'),
          confirmButtonText: this.transloco.translate('Discard'),
        });
        if (result.value) {
          return result.value;
        } else {
          return false;
        }
      },
    });
    modalRef.result.then(
      (send: Message) => {
        Swal.fire(
          this.transloco.translate('Message sent succesfully'),
          send.title,
          'success'
        );
      },
      (reason) => console.info(reason)
    );
    modalRef.componentInstance.message = message;
  }

  getFileIcon(file: FileInfo): string {
    switch (file.type) {
      case 'application/pdf':
        return 'far fa-2x fa-file-pdf danger-text';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'far fa-2x fa-file-excel success-text';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'far fa-2x fa-file-word primary-text';
      case 'image/jpeg':
      case 'image/png':
        return 'far fa-2x fa-image secondary-text';
      case 'audio/mpeg':
        return 'far fa-2x fa-file-audio secondary-text';
      default:
        return 'fas fa-2x fa-file-download primary-text';
    }
  }
}
