import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';

import { FilesService } from '../../services/files.service';

@Component({
  selector: 'skooltrak-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.sass'],
})
export class DocumentsFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  constructor(
    public modal: NgbActiveModal,
    private fileServ: FilesService,
    private fb: FormBuilder,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  setFile(file: any): void {
    this.isLoading = true;
    this.fileServ.uploadFile(file).subscribe({
      next: (res) => {
        this.form.get('file').setValue(res);
        this.form.get('name').setValue(res.fileName);
        this.isLoading = false;
      },
      error: (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate('We are fixing this error. Try it later'),
          'error'
        );
        this.isLoading = false;
      },
    });
  }
}
