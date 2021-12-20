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
          SidebarLink.Grades,
          SidebarLink.Teachers,
          SidebarLink.Groups,
          SidebarLink.Incidents,
          SidebarLink.Settings,
        ];
      case 'teacher':
        return [
          SidebarLink.Home,
          SidebarLink.Courses,
          SidebarLink.Documents,
          SidebarLink.Messaging,
          SidebarLink.Grades,
          SidebarLink.Assignments,
          SidebarLink.Groups,
          SidebarLink.Exams,
          SidebarLink.Forums,
          SidebarLink.Videos,
        ];
      case 'student':
        return [
          SidebarLink.Home,
          SidebarLink.Documents,
          SidebarLink.Courses,
          SidebarLink.Collection,
          SidebarLink.Messaging,
          SidebarLink.Assignments,
          SidebarLink.Grades,
          SidebarLink.Exams,
          SidebarLink.Forums,
        ];
    }
  }
}
