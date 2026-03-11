export interface ControlGroupsSearchRequest {
  pageRequest: {
    page: number
    limit: number
  }

  sorting: {
    sortBy: string
    sortDirection: "ASC" | "DESC"
  }

  filter?: {
    id?: number
    title?: string
    parentId?: number
    enabled?: boolean
  }
}