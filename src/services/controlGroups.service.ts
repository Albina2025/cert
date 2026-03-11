import { api } from "../api/axios"
import type { ControlGroupsItem } from "../types/control/ControlGroups.item.types"
import type { ControlGroupsFormValues } from "../types/control/controlGroups.form.types"

export const getControlGroupById = async (
  id: number
): Promise<ControlGroupsItem> => {
  const { data } = await api.get(`/api/v1/controls/${id}`)
  return data
}

export const createControlGroup = async (
  values: ControlGroupsFormValues
): Promise<void> => {
  await api.post("/api/v1/controls", values)
}

export const updateControlGroup = async (
  id: number,
  values: ControlGroupsFormValues
): Promise<void> => {
  await api.put(`/api/v1/controls/${id}`, values)
}

export const changeControlGroupStatus = async (
  id: number,
  activation: boolean
): Promise<void> => {
  await api.put(`/api/v1/controls/activation/${id}?activation=${activation}`)
}