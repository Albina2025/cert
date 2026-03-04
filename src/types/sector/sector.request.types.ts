/* CREATE */

export interface CreateSectorRequest {
  titleRu: string;
  titleKg: string;
  address: string;
  logo?: string;
  parentId?: number;
}

/* SEARCH */
export type SectorFilter =
  SectorSearchRequest["filter"];

export interface SectorFilterForm {
    id?: number;
    title?: string;
    address?: string;
    enabled?: boolean;
    exclude?: string; 
    auditedMinistries?: boolean;
}

export interface SectorSearchRequest {
  pageRequest: {
    page: number;
    limit: number;
  };
  sorting: {
    sortBy: "ID" | "TITLE_RU" | "TITLE_KG" | "ADDRESS";
    sortDirection: "ASC" | "DESC";
  };
  filter: {
    id?: number;
    title?: string;
    address?: string;
    enabled?: boolean;
    exclude?: number ;
    auditedMinistries?: boolean;
  };
}