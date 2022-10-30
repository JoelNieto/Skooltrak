import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesSimpleFormComponent } from './grades-form.component';

describe('GradesSimpleFormComponent', () => {
  let component: GradesSimpleFormComponent;
  let fixture: ComponentFixture<GradesSimpleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesSimpleFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradesSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
