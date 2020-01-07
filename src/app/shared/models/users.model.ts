export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  profiles: Profile[];
  authProviders: AuthProvider[];
  registerDate: string;
}

export interface AuthProvider {
  uid: string;
  displayName?: string;
  email: string;
  providerId: string;
  emailVerified?: boolean;
  photoURL?: string;
}

export interface Profile {
  role: Role;
  code: string;
  active: boolean;
  registerDate: string;
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
