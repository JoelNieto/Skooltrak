import { Component, OnInit } from '@angular/core';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import { SessionService } from 'src/app/shared/services/session.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  constructor(
    private schoolService: SchoolsService,
    private session: SessionService
  ) {}

  ngOnInit() {
    if (!this.session.currentSchool) {
      this.schoolService.getDefault().subscribe(res => {
        this.session.currentSchool = res;
      });
    }
  }
}
