import { Component, Input, OnInit, HostBinding } from '@angular/core';

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
  @HostBinding('class.admin') get admin() {
    return this.role === 'admin';
  }
  @HostBinding('class.student') get student() {
    return this.role === 'student';
  }
  links: SidebarLink[];
  constructor(
    private sidebarService: SidebarService,
    public session: SessionService
  ) {}

  ngOnInit() {
    this.links = this.sidebarService.getLinks(this.role);
  }
}
