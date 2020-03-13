import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDocumentsComponent } from './courses-documents.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

describe('CoursesDocumentsComponent', () => {
  let component: CoursesDocumentsComponent;
  let fixture: ComponentFixture<CoursesDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoTestingModule, CustomComponentsModule ],
      declarations: [ CoursesDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
