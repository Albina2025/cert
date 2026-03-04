import { api } from "../api/axios";
import type { CreateAiRequest, AiSelectRequest} from "../types/ai/ai.request.types"
import type {AiSelectResponse} from "../types/ai/ai.response.types"

export const getAiById = (id: number) =>
  api.get(`/api/v1/ai/${id}`);

export const createAi = (data: CreateAiRequest) =>
  api.post("/api/v1/ai", data);

export const selectAi = (data: AiSelectRequest) =>
  api.post<AiSelectResponse>("/api/v1/ai/select", data);

export const deleteAi = (id: number) =>
  api.delete(`/api/v1/ai/${id}`);

export const updateAi = (id: number, data: CreateAiRequest) =>
  api.put(`/api/v1/ai/${id}`, data);