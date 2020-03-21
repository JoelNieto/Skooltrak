import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  group: Observable<ClassGroup>;

  constructor(
    private route: ActivatedRoute,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.group = this.groupsService.get(params.id);
    });
  }

}