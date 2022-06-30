import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Message, MessageInbox } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.sass'],
})
export class TrashComponent implements OnInit {
  public messages$: Observable<MessageInbox[]>;
  constructor(
    private messageService: MessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.messages$ = this.messageService.getTrash();
  }

  openMessage(message: Message) {
    this.router.navigate([message.id], {
      relativeTo: this.route.parent,
    });
  }

  recover(id: string) {
    this.messageService.recoverTrash(id).subscribe({
      next: () => {
        this.messages$ = this.messageService.getTrash();
      },
      error: (err) => console.error(err),
    });
  }

  async delete(id: string) {
    const result = await Swal.fire<Promise<boolean>>({
      title: 'Desea eliminar este mensaje?',
      text: 'Esto no podrá ser recuperado de ninguna manera',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    });
    if (result.isConfirmed) {
      this.messageService.delete(id).subscribe({
        next: () => {
          Swal.fire('Mensaje eliminado', '', 'info');
          this.messages$ = this.messageService.getTrash();
        },
        error: (err) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            err.message,
            'error'
          );
        },
      });
    }
  }
}