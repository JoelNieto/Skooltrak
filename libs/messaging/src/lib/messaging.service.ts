import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Inbox, PaginatedData } from '@skooltrak-app/models';

@Injectable({ providedIn: 'root' })
export class MessagingService {
  private http = inject(HttpClient);

  getInbox(pageSize: number, pageIndex: number) {
    return this.http.get<PaginatedData<Inbox>>('messages/inbox', {
      params: { pageSize, pageIndex },
    });
  }
}
