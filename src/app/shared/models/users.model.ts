export interface User {
  id: string;
  userName: string;
  password?: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  role?: Role;
  blocked?: boolean;
  plan?: Reference;
  group?: Reference;
  people: Reference[];
  notificationMails: string[];
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
  code: number;
}

interface Access {
  id: string;
  name: string;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
}

export interface Login {
  userName: string;
  password: string;
}
