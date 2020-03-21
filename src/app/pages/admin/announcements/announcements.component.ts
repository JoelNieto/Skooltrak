import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/shared/models/announcements.model';
import { AnnouncementService } from 'src/app/shared/services/announcements.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.sass']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Observable<Announcement[]>;
  table = new TableOptions();

  constructor(
    private announcementsService: AnnouncementService,
    private translate: TranslocoService
  ) {}

  ngOnInit() {
    this.table.columns = [
      { name: 'title', title: this.translate.translate('Title') },
      {
        name: 'author',
        title: this.translate.translate('Author'),
        type: 'object',
        objectColumn: 'author.displayName'
      },
      {
        name: 'activeSince',
        title: this.translate.translate('Active since'),
        type: 'date'
      },
      {
        name: 'activeUntil',
        title: this.translate.translate('Active until'),
        type: 'date'
      },
      {
        name: 'createdDate',
        title: this.translate.translate('Create date'),
        type: 'datetime'
      }
    ];
    this.table.newURL = ['new'];
    this.announcements = this.announcementsService.getAll();
  }
}
