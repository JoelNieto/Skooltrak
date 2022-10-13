import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsFormComponent } from './periods-form.component';

describe('PeriodsFormComponent', () => {
  let component: PeriodsFormComponent;
  let fixture: ComponentFixture<PeriodsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PeriodsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
