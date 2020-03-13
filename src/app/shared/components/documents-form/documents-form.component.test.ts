import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFormComponent } from './documents-form.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DocumentsFormComponent', () => {
  let component: DocumentsFormComponent;
  let fixture: ComponentFixture<DocumentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoTestingModule, ReactiveFormsModule, NgbModalModule, HttpClientTestingModule ],
      declarations: [ DocumentsFormComponent ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
