import type { ControlGroupsItem } from "./ControlGroups.item.types"

export interface ControlGroupsSearchResponse {
  page: number
  numberOfElements: number
  totalPages: number
  totalElements: number
  content: ControlGroupsItem[]
}