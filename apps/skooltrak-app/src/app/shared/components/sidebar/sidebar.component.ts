import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { SchoolsService } from '../../services/schools.service';
import { SessionService } from '../../services/session.service';
import { SidebarLink } from './sidebar.links';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'skooltrak-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  @Input() role: 'admin' | 'teacher' | 'parent' | 'student' = 'admin';
  @HostBinding('class.admin') get admin() {
    return this.role === 'admin';
  }
  @HostBinding('class.student') get student() {
    return this.role === 'student';
  }
  @HostBinding('class.teacher') get teacher() {
    return this.role === 'teacher';
  }
  links: SidebarLink[];
  constructor(
    private sidebarService: SidebarService,
    public school: SchoolsService,
    public session: SessionService
  ) {}

  ngOnInit(): void {
    this.links = this.sidebarService.getLinks(this.role);
  }
}
