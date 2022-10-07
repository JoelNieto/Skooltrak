import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsStudentsComponent } from './groups-students.component';

describe('GroupsStudentsComponent', () => {
  let component: GroupsStudentsComponent;
  let fixture: ComponentFixture<GroupsStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GroupsStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
