import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '../../models/content.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.sass']
})
export class ContentFormComponent implements OnInit {
  @Input() content: Content;

  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 300,
    minHeight: 100,
    uploadImagePath: '',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ]
  };

  form: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.content ? this.content.id : ''],
      title: [this.content ? this.content.title : '', [Validators.required]],
      body: [this.content ? this.content.body : '', [Validators.required]],
      course: [this.content ? this.content.course : undefined]
    });
  }
}