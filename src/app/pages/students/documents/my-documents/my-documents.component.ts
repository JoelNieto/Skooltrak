import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.sass'],
})
export class MyDocumentsComponent implements OnInit {
  documents$: Observable<UploadFile[]>;
  filtered$: Observable<UploadFile[]>;
  constructor(
    private studentService: StudentsService,
    private session: SessionService,
    public filesService: FilesService,
    private documentsService: DocumentsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.documents$ = this.studentService.getDocuments(
      this.session.currentStudent.id
    );

    this.filtered$ = this.documents$;
  }

  public changeSearch(event: any) {
    let searchText: string = event.target.value;
    if (searchText.trim() !== null || searchText.trim() !== '') {
      searchText = searchText.toLowerCase();
      this.filtered$ = this.documents$.pipe(
        map((documents) =>
          documents.filter(
            (x) =>
              x.name.toLowerCase().indexOf(searchText) > -1 ||
              x.description.toLowerCase().indexOf(searchText) > -1
          )
        )
      );
    } else {
      this.filtered$ = this.documents$;
    }
  }

  async deleteFile(file: UploadFile) {
    const result = await Swal.fire<Promise<boolean>>({
      title: file.name,
      text: this.transloco.translate('Wanna delete this file?'),
      icon: 'warning',
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      showCancelButton: true,
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Yes, delete'),
    });

    if (result.isConfirmed) {
      this.documentsService.delete(file.id).subscribe(
        () => {
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Document'),
            }),
            '',
            'info'
          );
          this.documents$ = this.studentService.getDocuments(
            this.session.currentStudent.id
          );
        },
        (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        }
      );
    }
  }
}
