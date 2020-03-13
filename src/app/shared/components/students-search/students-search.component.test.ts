import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { StudentsSearchComponent } from './students-search.component';

describe('StudentsSearchComponent', () => {
  let component: StudentsSearchComponent;
  let fixture: ComponentFixture<StudentsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsSearchComponent],
      imports: [
        TranslocoTestingModule,
        CustomComponentsModule,
        NgbModalModule,
        HttpClientTestingModule,
        NgbModalModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
