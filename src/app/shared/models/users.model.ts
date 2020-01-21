export interface User {
  id: string;
  providerId: string;
  displayName: string;
  email: string;
  photoURL: string;
  roles: Role[];
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
  access: Access[];
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
