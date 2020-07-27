export interface SidebarLink {
  name: string;
  route: string[];
  label: string;
  icon: string;
}

export class SidebarLink {
  static readonly Home = new SidebarLink(
    'home',
    ['home'],
    'Home',
    'fas fa-home fa-fw'
  );

  static readonly Collection = new SidebarLink(
    'collection',
    ['collection'],
    'Collection',
    'fas fa-money-check-alt fa-fw'
  );

  static readonly Documents = new SidebarLink(
    'documents',
    ['documents'],
    'Documents',
    'far fa-folder-open fa-fw'
  );

  static readonly Forums = new SidebarLink(
    'forums',
    ['forums'],
    'Forums',
    'far fa-comments fa-fw'
  );

  static readonly Courses = new SidebarLink(
    'courses',
    ['courses'],
    'Courses',
    'fas fa-laptop-code fa-fw'
  );

  static readonly Messaging = new SidebarLink(
    'messaging',
    ['messaging'],
    'Messaging',
    'far fa-envelope fa-fw'
  );

  static readonly Attendance = new SidebarLink(
    'attendance',
    ['attendance'],
    'Attendance',
    'fas fa-tasks fa-fw'
  );

  static readonly Announcements = new SidebarLink(
    'announcements',
    ['announcements'],
    'Announcements',
    'fas fa-bullhorn fa-fw'
  );

  static readonly Students = new SidebarLink(
    'students',
    ['students'],
    'Students',
    'far fa-address-book fa-fw'
  );

  static readonly Schools = new SidebarLink(
    'schools',
    ['schools'],
    'Schools',
    'fas fa-school fa-fw'
  );

  static readonly Teachers = new SidebarLink(
    'teachers',
    ['teachers'],
    'Teachers',
    'fas fa-chalkboard-teacher fa-fw'
  );

  static readonly Groups = new SidebarLink(
    'groups',
    ['groups'],
    'Groups',
    'fas fa-users fa-fw'
  );

  static readonly Settings = new SidebarLink(
    'settings',
    ['settings'],
    'Settings',
    'fas fa-cogs fa-fw'
  );

  static readonly Grades = new SidebarLink(
    'grades',
    ['grades'],
    'Grades',
    'far fa-check-square fa-fw'
  );

  static readonly Quizes = new SidebarLink(
    'quizes',
    ['quizes'],
    'Quizes',
    'fas fa-clipboard-check fa-fw'
  );

  static readonly Security = new SidebarLink(
    'security',
    ['security'],
    'Security',
    'fas fa-user-shield fa-fw'
  );

  static readonly Videos = new SidebarLink(
    'videos',
    ['videos'],
    'Videos',
    'fas fa-video fa-fw'
  );

  static readonly Assignments = new SidebarLink(
    'assignments',
    ['assignments'],
    'Assignments',
    'far fa-calendar-check fa-fw'
  );

  static readonly Surveys = new SidebarLink(
    'surveys',
    ['surveys'],
    'Surveys',
    'fas fa-poll-h fa-fw'
  );

  constructor(
    public name: string,
    public route: string[],
    public label: string,
    public icon: string
  ) {}

  public adminLinks = [
    'Home',
    'Students',
    'Schools',
    'Teachers',
    'Groups',
    'Settings',
    'Security',
    'Grades',
    'Courses',
    'Messaging',
    'Surveys',
  ];
}
