import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Video } from 'src/app/shared/models/videos.model';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-modal-player',
  templateUrl: './modal-player.component.html',
  styleUrls: ['./modal-player.component.sass'],
})
export class ModalPlayerComponent {
  @Input() videoInfo: Video;
  constructor(public modal: NgbActiveModal, public files: FilesService) {}
}
