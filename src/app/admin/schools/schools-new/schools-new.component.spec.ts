import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SchoolsFormComponent } from '../schools-form/schools-form.component';
import { SchoolsNewComponent } from './schools-new.component';

describe('SchoolsNewComponent', () => {
  let component: SchoolsNewComponent;
  let fixture: ComponentFixture<SchoolsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsNewComponent, SchoolsFormComponent ],
      imports: [TranslateModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
