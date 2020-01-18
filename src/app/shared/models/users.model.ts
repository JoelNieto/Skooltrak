export interface User {
  id: string;
  providerId: string;
  displayName: string;
  email: string;
  photoURL: string;
  profiles: Profile[];
  registerDate: string;
}

export interface Profile {
  role: Role;
  code: string;
  active: boolean;
  registerDate: string;
  createDate: string;
}

export interface Role {
  id: string;
  name: string;
  isAdmin: boolean;
  isTeacher: boolean;
  isParent: boolean;
  isStudent: boolean;
  links: string[];
}

export interface Reference {
  id: string;
  name: string;
}
