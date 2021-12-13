import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';
import { IncidentsMock } from 'src/app/shared/mocks/incidents.mock';

import { FormComponent } from './form.component';

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslocoTestingModule,
        CustomComponentsModule,
        NgxSummernoteModule,
      ],
      declarations: [FormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save incident', () => {
    spyOn(component.save, 'emit');
    component.saveIncident();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should have incident', () => {
    component.incident = IncidentsMock.sample;
    component.ngOnInit();
  });
});
