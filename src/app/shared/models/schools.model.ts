export interface School {
  id: string;
  name: string;
  shortName: string;
  logoURL: string;
  website: string;
  address: string;
  motto: string;
  contacts: Contact[];
  createDate: string;
  modificateDate: string;
}

export interface Contact {
  name: string;
  type: string;
  contactText: string;
  active: boolean;
}

export interface Type {
  id: number;
  name: string;
}
