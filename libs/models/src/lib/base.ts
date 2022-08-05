export type EntityBase = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
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
