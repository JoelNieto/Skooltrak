import { Injectable } from '@angular/core';

import { SidebarLink } from './sidebar.links';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor() {}

  getLinks(role: 'admin' | 'teacher' | 'parent' | 'student'): SidebarLink[] {
    switch (role) {
      case 'admin':
        return [
          SidebarLink.Home,
          SidebarLink.Collection,
          SidebarLink.Schools,
          SidebarLink.Students,
          SidebarLink.Grades,
          SidebarLink.Courses,
          SidebarLink.Teachers,
          SidebarLink.Groups,
          SidebarLink.Settings
        ];
        break;
      case 'teacher':
        return [
          SidebarLink.Home,
          SidebarLink.Grades,
          SidebarLink.Quizes,
          SidebarLink.Courses,
          SidebarLink.Groups,
          SidebarLink.Settings
        ];
      default:
        return [
          SidebarLink.Home,
          SidebarLink.Schools,
          SidebarLink.Courses,
          SidebarLink.Settings
        ];
        break;
    }
  }
}
