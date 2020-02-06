import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.sass']
})
export class DocumentsFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fileServ: FilesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  setFile(file: any) {
    this.fileServ.uploadFile(file).subscribe(res => {
      this.form.get('file').setValue(res);
      console.log(this.form.value);
    });
  }
}
