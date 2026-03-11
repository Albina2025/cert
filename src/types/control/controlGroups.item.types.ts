export interface ControlGroupsParent {
  id: number
  titleRu: string
  titleKg: string
}

export interface ControlGroupsItem {
  id: number
  titleRu: string
  titleKg: string
  identifier: string
  parent?: ControlGroupsParent
  enabled: boolean
}