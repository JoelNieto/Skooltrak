export interface School {
  id: string;
  name: string;
  shortName: string;
  logoURL: string;
  website: string;
  contacts: Contact[];
  createDate: string;
  modificateDate: string;
}

export interface Contact {
  name: string;
  type: Type;
  contactText: string;
  active: boolean;
}

export interface Type {
  id: number;
  name: string;
}
