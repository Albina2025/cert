export interface SoftwareItem {
  id: number;

  ministryDto: {
    id: number;
    titleRu: string;
    titleKg: string;
  };

  softwareName: string;
  softwarePurpose: string;
  manufacturer: string;
  supplier: string;
  purchaseDate: string;
  purchaseAmount: string;

  purchaseCurrency: {
    id: number;
    titleRu: string;
    titleKg: string;
  };

  softwareVersion: string;
  lastUpdateDate: string;
  licenseType: string;
  licenseExpiryDate: string;
  licenseCount: number;
}

export interface SoftwareSearchResponse {
  page: number;
  totalPages: number;
  totalElements: number;
  content: SoftwareItem[];
}