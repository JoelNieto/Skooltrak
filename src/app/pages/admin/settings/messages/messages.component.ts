import { Component, OnInit } from '@angular/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable, of } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/users.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass'],
})
export class MessagesComponent implements OnInit {
  users: Observable<User[]>;
  user: User;
  messages: Observable<Message[]> = of([]);
  table = new TableOptions();
  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.users = this.usersService.getAll();
    this.table.columns = [
      { name: 'title', title: 'Título' },
      { name: 'sendDate', title: 'Fecha de envío', type: 'datetime' },
    ];
  }

  getMessages(id: string) {
    this.messages = this.usersService.getMessages(id);
  }

  delete(id: string) {
    this.messagesService.deleteMessage(id).subscribe(
      () => {
        Swal.fire('', 'Mensaje eliminado correctamente', 'info');
      },
      (err: Error) => {
        Swal.fire('Ocurrió un error', err.message, 'error');
      }
    );
  }
}