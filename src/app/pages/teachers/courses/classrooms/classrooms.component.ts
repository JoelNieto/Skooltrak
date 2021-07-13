import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/shared/models/classrooms.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { ClassroomsService } from 'src/app/shared/services/classroom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.sass'],
})
export class ClassroomsComponent implements OnInit {
  rooms$: Observable<Classroom[]>;
  table = new TableOptions();
  constructor(
    private roomsService: ClassroomsService,
    private groups: ClassGroupsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.detailsURL = ['rooms'];
    this.table.columns = [
      {
        name: 'name',
        title: this.transloco.translate('Name'),
        required: true,
        filterable: true,
      },
      {
        name: 'description',
        title: this.transloco.translate('Description'),
        type: 'text',
        hidden: true,
      },
      {
        name: 'public',
        title: this.transloco.translate('Public room'),
        type: 'boolean',
        required: true,
      },
      {
        name: 'groups',
        title: this.transloco.translate('Groups'),
        type: 'array',
        asyncList: this.groups.getAll(),
        objectText: 'name',
      },
      {
        name: 'createdBy',
        title: this.transloco.translate('Created by'),
        type: 'object',
        objectColumn: 'createdBy.displayName',
        readonly: true,
      },
      {
        name: 'createdAt',
        title: this.transloco.translate('Created at'),
        type: 'datetime',
        readonly: true,
      },
    ];
    this.rooms$ = this.roomsService.getAll();
  }

  createRoom(room: Classroom) {
    this.roomsService.create(room).subscribe(
      (res) => {
        Swal.fire(res.name, 'Salón virtual creado exitosament', 'success');
        this.rooms$ = this.roomsService.getAll();
      },
      (err: Error) => {
        Swal.fire('Ocurrió un error', err.message, 'error');
      }
    );
  }
  editRoom(room: Classroom) {
    this.roomsService.edit(room.id, room).subscribe(
      () => {
        Swal.fire(room.name, 'Salón virtual editado exitosament', 'success');
        this.rooms$ = this.roomsService.getAll();
      },
      (err: Error) => {
        Swal.fire('Ocurrió un error', err.message, 'error');
      }
    );
  }

  deleteRoom(id: string) {
    this.roomsService.delete(id).subscribe(
      () => {
        Swal.fire('', 'Salón virtual eliminado exitosament', 'success');
        this.rooms$ = this.roomsService.getAll();
      },
      (err: Error) => {
        Swal.fire('Ocurrió un error', err.message, 'error');
      }
    );
  }
}
