import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'skooltrak-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.sass'],
})
export class DocumentFormComponent implements OnInit {
  form: UntypedFormGroup;
  constructor(
    public modal: NgbActiveModal,
    private fileServ: FilesService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  setFile(file: any) {
    this.fileServ.uploadFile(file).subscribe({
      next: (res) => {
        this.form.get('file').setValue(res);
      },
      error: (err) => console.error(err),
    });
  }
}
