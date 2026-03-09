import { api } from "../api/axios";
import type {CreateSectorRequest, SectorSearchRequest} from "../types/sector/sector.request.types";
import type { SectorSearchResponse } from "../types/sector/sector.response.types";
import type { SectorItem } from "../types/sector/sector.response.types";



export const createSector = (data: CreateSectorRequest) =>
  api.post("/api/v1/sector", data);

export const searchSector = (data: SectorSearchRequest) =>
  api.post<SectorSearchResponse>(
    "/api/v1/sector/search",
    data
  );

export const getSectorById = async (id: number) => {
   const response = await api.get<SectorItem>(
    `/api/v1/sector/${id}`
  );
  return response.data;
};

export const updateSector = (id: number, data: CreateSectorRequest) => {
  return api.put(`/api/v1/sector/${id}`, data);
};


export const changeSectorStatus = async (id: number,activation: boolean) => {
  const response = await api.put(`/api/v1/sector/activation/${id}`, null, {params: {activation}});
  return response.data;
};

