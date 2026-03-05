import { api } from "../api/axios";
import type {
  SoftwareCreateRequest,
  SoftwareSearchRequest,
} from "../types/software/software.request.types";

export const createSoftware = (data: SoftwareCreateRequest) =>
  api.post("/api/v1/software", data);

export const getSoftwareList = (data: SoftwareSearchRequest) =>
  api.post("/api/v1/software/search", data);

export const getSoftwareById = (id: number) =>
  api.get(`/api/v1/software/${id}`);

export const updateSoftware = (id: number, data: SoftwareCreateRequest) =>
  api.put(`/api/v1/software/${id}`, data);

export const deleteSoftware = (id: number) =>
  api.delete(`/api/v1/software/${id}`);