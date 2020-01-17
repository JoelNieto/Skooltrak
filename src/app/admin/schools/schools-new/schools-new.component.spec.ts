import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsNewComponent } from './schools-new.component';

describe('SchoolsNewComponent', () => {
  let component: SchoolsNewComponent;
  let fixture: ComponentFixture<SchoolsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsNewComponent ]
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
