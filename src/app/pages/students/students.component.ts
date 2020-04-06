import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { MessageInbox } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass'],
})
export class StudentsComponent implements OnInit {
  constructor(
    private signalR: SignalRService,
    public session: SessionService,
    private messageService: MessagesService,
    public links: SidebarService
  ) {}

  ngOnInit() {
    this.signalR.startForumConnection();
    this.signalR.startMessageConnection();
    this.listenMessages(this.session.currentUser.id);
    this.session.currentInbox = this.messageService.getInbox();
    this.messageService.getUnread().subscribe((res) => {
      this.session.messageCount = res;
    });
  }

  listenMessages(id: string): void {
    this.signalR.messageConnection.on(id, (message: MessageInbox) => {
      this.session.addMessage(message);
    });
  }
}
