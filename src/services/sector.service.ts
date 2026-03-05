import { api } from "../api/axios";
import type {
  CreateSectorRequest,
  SectorSearchRequest,
  SectorSearchResponse,
} from "../types/sector.types";
import type { SectorItem } from "../types/sector.types";



export const createSector = (data: CreateSectorRequest) =>
  api.post("/api/v1/sector", data);



export const searchSector = (data: SectorSearchRequest) =>
  api.post<SectorSearchResponse>(
    "/api/v1/sector/search",
    data
  );

// export const deleteSector = (id: number) =>
//   api.delete(`/api/v1/sector/${id}`);

export const getSectorById = async (id: number) => {
   const response = await api.get<SectorItem>(
    `/api/v1/sector/${id}`
  );
  return response.data;
};

export const updateSector = (id: number, data: CreateSectorRequest) => {
  return api.put(`/api/v1/sector/${id}`, data);
};