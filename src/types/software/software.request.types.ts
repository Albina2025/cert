export interface SoftwareCreateRequest {
  ministryId: number;
  softwareName: string;
  softwarePurpose: string;
  manufacturer: string;
  supplier: string;
  purchaseDate: string;
  purchaseAmount: number;
  purchaseCurrencyId: number;
  softwareVersion: string;
  lastUpdateDate: string;
  licenseType: string;
  licenseExpiryDate: string;
  licenseCount: number;
}

export interface PageRequest {
  page: number;
  limit: number;
}

export interface Sorting {
  sortBy: "ID";
  sortDirection: "ASC" | "DESC";
}

export interface SoftwareSearchRequest {
  pageRequest: PageRequest;
  sorting: Sorting;
  filter: {
    ministryId?: number | null;
  };
}