import { api } from "../api/axios";
import type { CreateAiRequest, AiSearchRequest} from "../types/ai/ai.request.types"
import type {AiSelectResponse} from "../types/ai/ai.response.types"
import type { SectorFormValues } from "../types/sector/sector.form.types";


export const getSectorById = async (id: number) => {
  const response = await api.get<SectorFormValues>(
    `/api/v1/sector/${id}`
  );
  return response.data; 
};

export const createAi = async (data: CreateAiRequest) => {
  const response = await api.post("/api/v1/ai", data);
  return response.data;
};

export const searchAi  = (data: AiSearchRequest) =>
  api.post<AiSelectResponse>("/api/v1/ai/select", data);

export const updateAi = (id: number, data: CreateAiRequest) =>
  api.put(`/api/v1/ai/${id}`, data);

export const selectAi = (data: AiSearchRequest) =>
  api.post("/api/v1/ai/select", data);