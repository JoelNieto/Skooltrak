import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGroupsFormComponent } from './class-groups-form.component';

describe('ClassGroupsFormComponent', () => {
  let component: ClassGroupsFormComponent;
  let fixture: ComponentFixture<ClassGroupsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClassGroupsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
