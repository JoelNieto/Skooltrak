import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { Ranking } from 'src/app/shared/models/rankings.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { PeriodsService } from 'src/app/shared/services/periods.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.sass'],
})
export class RankingsComponent implements OnInit {
  groups$!: Observable<ClassGroup[]>;
  periods$!: Observable<Period[]>;
  selectedGroup!: ClassGroup;
  period!: Period;
  rankings$: Observable<Ranking[]> = of([]);
  constructor(
    private readonly groupsService: ClassGroupsService,
    private readonly periodsService: PeriodsService
  ) {}

  ngOnInit(): void {
    this.groups$ = this.groupsService.getAll();
    this.periods$ = this.periodsService.getAll();
  }

  getRankings(): void {
    if (this.selectedGroup && this.period) {
      this.rankings$ = this.groupsService.getRankings(
        this.selectedGroup.id,
        this.period.id
      );
    }
  }
}
