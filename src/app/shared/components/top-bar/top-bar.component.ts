import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { SessionService } from '../../services/session.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'nav[app-top-bar]',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {
  @Input() role: 'admin' | 'teacher' | 'parent' | 'student' = 'admin';
  @HostBinding('class.bg-admin') get admin() {
    return this.role === 'admin';
  }
  @HostBinding('class.bg-student') get student() {
    return this.role === 'student';
  }
  @HostBinding('class.bg-teacher') get teacher() {
    return this.role === 'teacher';
  }
  constructor(public links: SidebarService, public session: SessionService) {}

  ngOnInit(): void {}
}
