import { User } from './auth';

export type EntityBase = {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: User;
};

export type PaginationQuery = {
  pageSize: number;
  pageIndex: number;
};

export interface PaginationQuerySearch extends PaginationQuery {
  searchText: string | undefined | null;
  sortReverse: boolean;
}

export interface PaginatedData<T> extends PaginationQuery {
  count: number;
  items: T[];
}

export type QueryItem =
  | 'school'
  | 'student'
  | 'course'
  | 'group'
  | 'plan'
  | 'grade'
  | 'folder'
  | 'counselor'
  | 'teacher'
  | 'type'
  | 'period';

export type QueryApi = Record<QueryItem, string>;

export type QueryApiDate = Partial<QueryApi> & { start: Date; end: Date };

export type Link = { title: string; route: string; icon: string };
