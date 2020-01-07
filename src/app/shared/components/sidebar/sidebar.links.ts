export interface SidebarLink {
  name: string;
  route: string[];
  label: string;
  icon: string;
}

export class SidebarLink {
  static readonly Home = new SidebarLink(
    'home',
    ['Home'],
    'Home',
    'fas fa-home fa-fw'
  );
  static readonly Collection = new SidebarLink(
    'collection',
    ['Collection'],
    'Collection',
    'fas fa-money-check-alt'
  );
  static readonly Courses = new SidebarLink(
    'courses',
    ['Courses'],
    'Courses',
    'fas fa-laptop-code fa-fw'
  );
  static readonly Students = new SidebarLink(
    'students',
    ['Students'],
    'Students',
    'far fa-address-book fa-fw'
  );
  static readonly Schools = new SidebarLink(
    'schools',
    ['Schools'],
    'Schools',
    'fas fa-school fa-fw'
  );
  static readonly Teachers = new SidebarLink(
    'teachers',
    ['Teachers'],
    'Teachers',
    'fas fa-chalkboard-teacher fa-fw'
  );
  static readonly Groups = new SidebarLink(
    'groups',
    ['Groups'],
    'Groups',
    'fas fa-users fa-fw'
  );
  static readonly Settings = new SidebarLink(
    'settings',
    ['Settings'],
    'Settings',
    'fas fa-cogs fa-fw'
  );
  static readonly Grades = new SidebarLink(
    'grades',
    ['Grades'],
    'Grades',
    'far fa-check-square fa-fw'
  );
  static readonly Quizes = new SidebarLink(
    'quizes',
    ['Quizes'],
    'Quizes',
    'fas fa-clipboard-check fa-fw'
  );
  constructor(
    public name: string,
    public route: string[],
    public label: string,
    public icon: string
  ) {}
}

export const adminLinks = [
  'courses',
  'students',
  'schools',
  'teachers',
  'groups',
  'settings'
];
