import type { FilterField } from "../UI/filter/FilterModal"

export type ControlGroupsFilter = {
  id?: number
  titleRu?: string
  titleKg?: string
  parentId?: number
}

export const controlGroupsFilterInitialValues: ControlGroupsFilter = {
  id: undefined,
  titleRu: "",
  titleKg: "",
  parentId: undefined,
}

export const controlGroupsFilter: FilterField<ControlGroupsFilter>[] = [
  {
    type: "number",
    name: "id",
    label: "",
  },

  {
    type: "text",
    name: "titleRu",
    label: "",
  },

  {
    type: "text",
    name: "titleKg",
    label: "",
  },

  {
    type: "number",
    name: "parentId",
    label: "",
  },
]