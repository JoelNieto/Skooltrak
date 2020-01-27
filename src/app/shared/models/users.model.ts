export interface User {
  id: string;
  userName: string;
  password: string;
  providerId: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: Role;
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
  code: string;
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
