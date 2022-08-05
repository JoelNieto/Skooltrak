import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationArea, EvaluationItem } from 'src/app/shared/models/evaluation-areas.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'skooltrak-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.sass'],
})
export class EvaluationFormComponent implements OnInit {
  @Input() area: EvaluationArea;

  public form: UntypedFormGroup;
  constructor(
    public modal: NgbActiveModal,
    private fb: UntypedFormBuilder,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.area ? this.area.id : ''],
      name: [this.area ? this.area.name : '', [Validators.required]],
      description: [
        this.area ? this.area.description : '',
        [Validators.required],
      ],
      color: [this.area ? this.area.color : ''],
      icon: [this.area ? this.area.icon : ''],
      items: this.area
        ? this.fb.array(this.initExistingItem())
        : this.fb.array([this.initItem()]),
    });
  }

  setColor(color: string): void {
    this.form.get('color').setValue(color);
  }

  setIcon(icon: string): void {
    this.form.get('icon').setValue(icon);
  }

  initItem(item?: EvaluationItem): UntypedFormGroup {
    return this.fb.group({
      name: [item ? item.name : '', [Validators.required]],
      description: [item ? item.description : '', [Validators.required]],
    });
  }

  initExistingItem(): UntypedFormGroup[] {
    const controls: UntypedFormGroup[] = [];
    this.area.items.forEach((item) => {
      controls.push(this.initItem(item));
    });
    return controls;
  }

  addItem(): void {
    const controls = this.form.get('items') as UntypedFormArray;
    controls.push(this.initItem());
  }

  removeItem(i: number): void {
    const controls = this.form.get('items') as UntypedFormArray;
    controls.removeAt(i);
  }

  saveForm(): void {
    this.modal.close(this.form.value);
  }
}
