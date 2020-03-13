import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { Forum } from 'src/app/shared/models/forums.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { ForumsService } from 'src/app/shared/services/forums.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass']
})
export class DocumentsComponent implements OnInit {
  @Input() forum: Forum;

  documents: Observable<UploadFile[]>;
  constructor(
    private forumService: ForumsService,
    public filesService: FilesService
  ) {}

  ngOnInit(): void {
    this.documents = this.forumService.getDocuments(this.forum.id);
  }

  getFileIcon(file: UploadFile): string {
    switch (file.file.type) {
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
