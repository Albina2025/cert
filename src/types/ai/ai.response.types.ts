export interface AiItem {
    id: number;
    titleKg: string;
    titleRu: string;

  ministryDto: {
    id: number;
    titleKg: string;
    titleRu: string;
    address: string;
    enabled: boolean;
  };

  computePlatformType: {
    id: number;
    titleKg: string;
    titleRu: string;
  };

  hardwareName: string;
  hardwarePurpose: string;
  responsibleUnit: string;
  hardwareSupplier: string;

  purchaseDate: string;
  purchaseAmount: string;

  purchaseCurrency: {
    id: number;
    titleKg: string;
    titleRu: string;
  };

  hardwareSpecs: string;
  modelName: string;
  modelPurpose: string;
  modelDeveloper: string;

  usesApi: boolean;
  apiProvider: string;
}

export interface AiSelectResponse {
    page: number;
    totalElements: number;
    content: AiItem[];
    numberOfElements: number;
    totalPages: number;
}

export interface AiSearchResponse<T> {
  page: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
  content: T[];
}