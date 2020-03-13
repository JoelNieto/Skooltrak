import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.sass']
})
export class DocumentsFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private fileServ: FilesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  setFile(file: any): void {
    this.isLoading = true;
    this.fileServ.uploadFile(file).subscribe(res => {
      this.form.get('file').setValue(res);
      this.form.get('name').setValue(res.fileName);
      this.isLoading = false;
    });
  }

}
