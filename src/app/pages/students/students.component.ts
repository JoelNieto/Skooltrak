import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';
import { MessageInbox } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';

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
    private schoolService: SchoolsService,
    public links: SidebarService
  ) {}

  ngOnInit(): void {
    this.signalR.startForumConnection();
    this.signalR.startMessageConnection();
    if (!this.session.currentSchool) {
      this.schoolService.getDefault().subscribe(
        (res) => {
          this.session.currentSchool = res;
        },
        (err) => console.error(err)
      );
    }
    this.listenMessages(this.session.currentUser.id);
    this.session.currentInbox = this.messageService.getInbox();
    this.messageService.getUnread().subscribe(
      (res) => {
        this.session.messageCount = res;
      },
      (err) => console.error(err)
    );
  }

  listenMessages(id: string): void {
    this.signalR.messageConnection.on(id, (message: MessageInbox) => {
      this.session.addMessage(message);
    });
  }
}
