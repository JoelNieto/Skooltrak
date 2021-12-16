import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { GroupMock } from 'src/app/shared/mocks/groups.mock';
import { PeriodMock } from 'src/app/shared/mocks/period.mock';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

import { RankingsComponent } from './rankings.component';

fdescribe('RankingsComponent', () => {
  let component: RankingsComponent;
  let fixture: ComponentFixture<RankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslocoTestingModule],
      providers: [ClassGroupsService],
      declarations: [RankingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Rankings', () => {
    const groups = TestBed.inject(ClassGroupsService);
    const spy = spyOn(groups, 'getRankings');
    component.selectedGroup = GroupMock.sample;
    component.period = PeriodMock.sample;
    component.getRankings();
    expect(spy).toHaveBeenCalledWith(GroupMock.sample.id, PeriodMock.sample.id);
  });
});
