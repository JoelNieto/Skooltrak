import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsFormComponent } from './parents-form.component';

describe('ParentsFormComponent', () => {
  let component: ParentsFormComponent;
  let fixture: ComponentFixture<ParentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ParentsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
