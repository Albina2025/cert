

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