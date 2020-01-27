import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.columns = [
      { name: 'title', title: this.translate.instant('Title') },
      {
        name: 'author',
        title: this.translate.instant('Author'),
        type: 'object',
        objectColumn: 'author.displayName'
      },
      {
        name: 'activeSince',
        title: this.translate.instant('Active since'),
        type: 'date'
      },
      {
        name: 'activeUntil',
        title: this.translate.instant('Active until'),
        type: 'date'
      },
      {
        name: 'createdDate',
        title: this.translate.instant('Create date'),
        type: 'datetime'
      }
    ];
    this.table.newURL = ['new'];
    this.announcements = this.announcementsService.getAll();
  }
}
