import { Component, Input, OnInit } from '@angular/core';

import { SessionService } from '../../services/session.service';
import { SidebarLink } from './sidebar.links';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  @Input() role: 'admin' | 'teacher' | 'parent' | 'student' = 'admin';
  links: SidebarLink[];
  constructor(private sidebarService: SidebarService, public session: SessionService) {}

  ngOnInit() {
    this.links = this.sidebarService.getLinks(this.role);
  }
}
