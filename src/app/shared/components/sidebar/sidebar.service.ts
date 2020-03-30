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
          SidebarLink.Messaging,
          SidebarLink.Announcements,
          SidebarLink.Collection,
          SidebarLink.Students,
          SidebarLink.Courses,
          SidebarLink.Teachers,
          SidebarLink.Groups,
          SidebarLink.Security,
          SidebarLink.Settings
        ];
        break;
      case 'teacher':
        return [
          SidebarLink.Home,
          SidebarLink.Courses,
          SidebarLink.Forums,
          SidebarLink.Attendance,
          SidebarLink.Grades,
          SidebarLink.Quizes,
          SidebarLink.Groups
        ];
      case 'student':
        return [
          SidebarLink.Home,
          SidebarLink.Courses,
          SidebarLink.Messaging,
          SidebarLink.Forums,
          SidebarLink.Grades
        ];
        break;
    }
  }
}
