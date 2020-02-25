import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { GradesFormComponent } from './grades-form.component';

describe('GradesFormComponent', () => {
  let component: GradesFormComponent;
  let fixture: ComponentFixture<GradesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModalModule,
        NgbModule,
        HttpClientTestingModule,
        TranslocoTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [NgbActiveModal],
      declarations: [GradesFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
