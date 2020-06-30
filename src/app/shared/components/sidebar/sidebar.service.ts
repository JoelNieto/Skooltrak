import { Injectable } from '@angular/core';

import { SidebarLink } from './sidebar.links';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}

  getLinks(role: 'admin' | 'teacher' | 'parent' | 'student'): SidebarLink[] {
    switch (role) {
      case 'admin':
        return [
          SidebarLink.Home,
          SidebarLink.Messaging,
          SidebarLink.Collection,
          SidebarLink.Students,
          SidebarLink.Surveys,
          SidebarLink.Courses,
          SidebarLink.Teachers,
          SidebarLink.Groups,
          SidebarLink.Security,
          SidebarLink.Settings,
        ];
        break;
      case 'teacher':
        return [
          SidebarLink.Home,
          SidebarLink.Messaging,
          SidebarLink.Grades,
          SidebarLink.Assignments,
          SidebarLink.Courses,
          SidebarLink.Quizes,
          SidebarLink.Forums,
          SidebarLink.Videos,
        ];
      case 'student':
        return [
          SidebarLink.Home,
          SidebarLink.Messaging,
          SidebarLink.Grades,
          SidebarLink.Quizes,
          SidebarLink.Courses,
          SidebarLink.Forums,
        ];
        break;
    }
  }
}
