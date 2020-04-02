import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FileInfo } from 'src/app/shared/models/documents.model';
import { MessageInbox } from 'src/app/shared/models/message.model';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  @Input() message: MessageInbox;
  constructor(public modal: NgbActiveModal, public filesService: FilesService) {}

  ngOnInit(): void {}

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
