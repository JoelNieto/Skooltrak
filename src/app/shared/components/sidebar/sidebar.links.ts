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
    'bi bi-house medium-text'
  );

  static readonly Collection = new SidebarLink(
    'collection',
    ['collection'],
    'Collection',
    'bi bi-cash-coin medium-text'
  );

  static readonly Documents = new SidebarLink(
    'documents',
    ['documents'],
    'Documents',
    'bi bi-folder2-open medium-text'
  );

  static readonly Forums = new SidebarLink(
    'forums',
    ['forums'],
    'Forums',
    'bi bi-chat-quote medium-text'
  );

  static readonly Courses = new SidebarLink(
    'courses',
    ['courses'],
    'Courses',
    'bi bi-laptop medium-text'
  );

  static readonly Messaging = new SidebarLink(
    'messaging',
    ['messaging'],
    'Messaging',
    'bi bi-envelope-open medium-text'
  );

  static readonly Incidents = new SidebarLink(
    'incidents',
    ['incidents'],
    'Incidents',
    'bi bi-file-earmark-post medium-text'
  );

  static readonly Attendance = new SidebarLink(
    'attendance',
    ['attendance'],
    'Attendance',
    'bi bi-calendar2-check medium-text'
  );

  static readonly Announcements = new SidebarLink(
    'announcements',
    ['announcements'],
    'Announcements',
    'bi bi-megaphone medium-text'
  );

  static readonly Students = new SidebarLink(
    'students',
    ['students'],
    'Students',
    'bi bi-person-bounding-box medium-text'
  );

  static readonly Schools = new SidebarLink(
    'schools',
    ['schools'],
    'Schools',
    'bi bi-building medium-text'
  );

  static readonly Teachers = new SidebarLink(
    'teachers',
    ['teachers'],
    'Teachers',
    'bi bi-person-badge medium-text'
  );

  static readonly Groups = new SidebarLink(
    'groups',
    ['groups'],
    'Groups',
    'bi bi-people medium-text'
  );

  static readonly Settings = new SidebarLink(
    'settings',
    ['settings'],
    'Settings',
    'bi bi-gear medium-text'
  );

  static readonly Grades = new SidebarLink(
    'grades',
    ['grades'],
    'Grades',
    'bi bi-journal-check medium-text'
  );

  static readonly Quizes = new SidebarLink(
    'quizes',
    ['quizes'],
    'Quizes',
    'bi bi-clipboard-check medium-text'
  );

  static readonly Exams = new SidebarLink(
    'exams',
    ['exams'],
    'Exams',
    'bi bi-clipboard-check medium-text'
  );

  static readonly Security = new SidebarLink(
    'security',
    ['security'],
    'Security',
    'bi bi-shield-check medium-text'
  );

  static readonly Videos = new SidebarLink(
    'videos',
    ['videos'],
    'Videos',
    'bi bi-camera-video medium-text'
  );

  static readonly Assignments = new SidebarLink(
    'assignments',
    ['assignments'],
    'Assignments',
    'bi bi-calendar3 medium-text'
  );

  static readonly Surveys = new SidebarLink(
    'surveys',
    ['surveys'],
    'Surveys',
    'bi bi-clipboard-data medium-text'
  );

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

  constructor(
    public name: string,
    public route: string[],
    public label: string,
    public icon: string
  ) {}
}
