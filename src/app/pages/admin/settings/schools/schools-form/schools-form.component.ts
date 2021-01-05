import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Contact, School } from 'src/app/shared/models/schools.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schools-form',
  templateUrl: './schools-form.component.html',
  styleUrls: ['./schools-form.component.sass'],
})
export class SchoolsFormComponent implements OnInit {
  @Input() school: School;
  @Output() save = new EventEmitter<School>();

  schoolForm: FormGroup;
  currentLogoURL: string;
  constructor(
    private fb: FormBuilder,
    private fileServ: FilesService,
    private transloco: TranslocoService,
    public schoolServ: SchoolsService
  ) {
    this.currentLogoURL = environment.defaultLogo;
  }

  ngOnInit() {
    this.schoolForm = this.fb.group({
      id: [this.school ? this.school.id : ''],
      name: [this.school ? this.school.name : '', [Validators.required]],
      shortName: [this.school ? this.school.shortName : ''],
      logoURL: [this.school ? this.school.logoURL : ''],
      currentYear: [this.school ? this.school.currentYear : ''],
      website: [this.school ? this.school.website : ''],
      address: [this.school ? this.school.address : ''],
      motto: [this.school ? this.school.motto : ''],
      contacts: this.school
        ? this.fb.array(this.initExisting())
        : this.fb.array([this.initContact()]),
    });
  }

  changeLogo(event: any): void {
    event.preventDefault();
    const element: HTMLElement = document.getElementById('logo');
    element.click();
  }

  setLogo(file: any): void {
    this.fileServ.uploadFile(file).subscribe(
      (res) => {
        this.school.logoURL = res.id;
        this.schoolForm.get('logoURL').setValue(res.id);
        this.schoolForm.get('logoURL').markAsDirty();
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          err.message,
          'error'
        );
      }
    );
  }

  initContact(contact?: Contact): FormGroup {
    return this.fb.group({
      name: [contact ? contact.name : '', [Validators.required]],
      type: [contact ? contact.type : '', [Validators.required]],
      contactText: [contact ? contact.contactText : '', [Validators.required]],
      active: [contact ? contact.active : true],
    });
  }

  initExisting(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.school.contacts.forEach((contact) => {
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
