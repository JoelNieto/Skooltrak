import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsNewComponent } from './schools-new.component';

describe('SchoolsNewComponent', () => {
  let component: SchoolsNewComponent;
  let fixture: ComponentFixture<SchoolsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SchoolsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
