import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';
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
    public session: SessionService,
    public links: SidebarService
  ) {}

  ngOnInit() {
    if (!this.session.currentSchool) {
      this.schoolService.getDefault().subscribe(res => {
        this.session.currentSchool = res;
      });
    }
  }
}
