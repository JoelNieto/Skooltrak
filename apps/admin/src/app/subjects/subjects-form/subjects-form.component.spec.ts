import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsFormComponent } from './subjects-form.component';

describe('SubjectsFormComponent', () => {
  let component: SubjectsFormComponent;
  let fixture: ComponentFixture<SubjectsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubjectsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
