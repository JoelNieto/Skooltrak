import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact, School } from 'src/app/shared/models/schools.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-schools-form',
  templateUrl: './schools-form.component.html',
  styleUrls: ['./schools-form.component.sass']
})
export class SchoolsFormComponent implements OnInit {
  @Input() school: School;
  @Output() save = new EventEmitter<School>();

  schoolForm: FormGroup;
  currentLogoURL: string;
  constructor(private fb: FormBuilder, private fileServ: FilesService) {
    this.currentLogoURL = environment.defaultLogo;
  }

  ngOnInit() {
    this.schoolForm = this.fb.group({
      id: [this.school ? this.school.id : ''],
      name: [this.school ? this.school.name : '', [Validators.required]],
      shortName: [this.school ? this.school.shortName : ''],
      logoURL: [this.school ? this.school.logoURL : ''],
      website: [this.school ? this.school.website : ''],
      address: [this.school ? this.school.address : ''],
      motto: [this.school ? this.school.address : ''],
      contacts: this.school
        ? this.fb.array(this.initExisting())
        : this.fb.array([this.initContact()]),
      createDate: [this.school ? this.school.createDate : ''],
      modificateDate: [this.school ? this.school.modificateDate : '']
    });
  }

  initContact(contact?: Contact): FormGroup {
    return this.fb.group({
      name: [contact ? contact.name : '', [Validators.required]],
      type: [contact ? contact.type : '', [Validators.required]],
      contactText: [contact ? contact.contactText : '', [Validators.required]],
      active: [contact ? contact.active : true]
    });
  }

  initExisting(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.school.contacts.forEach(contact => {
      controls.push(this.initContact(contact));
    });
    return controls;
  }

  addContact(): void {
    const controls = this.schoolForm.controls.contacts as FormArray;
    controls.push(this.initContact());
  }

  removeContact(i: number): void {
    const controls = this.schoolForm.controls.contacts as FormArray;
    controls.removeAt(i);
  }

  saveChanges() {
    this.save.emit(this.schoolForm.value);
  }
}
