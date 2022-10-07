import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGroupsDetailsComponent } from './class-groups-details.component';

describe('ClassGroupsDetailsComponent', () => {
  let component: ClassGroupsDetailsComponent;
  let fixture: ComponentFixture<ClassGroupsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClassGroupsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGroupsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
