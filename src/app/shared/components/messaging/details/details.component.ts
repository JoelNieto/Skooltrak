import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { FileInfo } from 'src/app/shared/models/documents.model';
import { MessageInbox } from 'src/app/shared/models/message.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  message$: Observable<MessageInbox>;
  constructor(
    private messageService: MessagesService,
    private session: SessionService,
    public filesService: FilesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.message$ = this.messageService.getMessage(params.id).pipe(
        map((message) => {
          if (!message.read) {
            this.messageService.setRead(message.id).subscribe(() => {
              this.session.currentInbox = this.messageService.getInbox();
              this.session.readMessage();
            });
          }
          return message;
        })
      );
    });
  }

  formatDate(date: Date) {
    return format(new Date(date), 'EEE, d MMM yyyy h:mm aaa', { locale: es });
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
