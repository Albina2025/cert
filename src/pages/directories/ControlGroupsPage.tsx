import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { TableData, type Column } from "../../layout/tableData/TableData"
import {ControlGroupsAddModal,ControlGroupsEditModal,} from "../../features/directories/controlGroups/index"
import { api } from "../../api/axios"
import type {ControlGroupsSearchRequest} from "../../types/control/controlGroups.request.types"
import type {ControlGroupsSearchResponse} from "../../types/control/controlGroups.response.types"
import type {ControlGroupsItem} from "../../types/control/controlGroups.item.types"
import {Button,Flex,Menu,useMantineColorScheme} from "@mantine/core"
import {IconChevronRight,IconMenu2,IconCheck,IconX} from "@tabler/icons-react"
import { changeControlGroupStatus } from "../../services/controlGroups.service"
import { FilterModal, type FilterField } from "../../UI/filter/FilterModal"
import {controlGroupsFilter,controlGroupsFilterInitialValues,type ControlGroupsFilter} from "../../filters/controlGroup.filter"

export const ControlGroupsPage: React.FC = () => {
  const { t, i18n } = useTranslation()

  const [openedAdd, setOpenedAdd] = useState(false)
  const [openedFilter, setOpenedFilter] = useState(false)

  const [editId, setEditId] = useState<number | null>(null)
  const [openedEdit, setOpenedEdit] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"

  const queryClient = useQueryClient()

  const statusMutation = useMutation({
    mutationFn: ({ id, activation }: { id: number; activation: boolean }) =>
      changeControlGroupStatus(id, activation),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["controlGroups"],
      })
    },
  })

  const [filter, setFilter] = useState<{
    id?: number
    title?: string
    parentId?: number
  }>({
    id: undefined,
    title: undefined,
    parentId: undefined,
  })

  const { data, isLoading } = useQuery<ControlGroupsSearchResponse>({
    queryKey: ["controlGroups", page, pageSize, filter],

    queryFn: async () => {
      const request: ControlGroupsSearchRequest = {
        pageRequest: {
          page: page - 1,
          limit: pageSize,
        },

        sorting: {
          sortBy: "ID",
          sortDirection: "ASC",
        },

        filter,
      }

      const response = await api.post(
        "/api/v1/controls/search",
        request
      )

      return response.data
    },
  })

  const columns: Column<ControlGroupsItem>[] = [
    {
      key: "id",
      label: "ID",
    },

    {
      key: "action",
      label: t("tableData.actions"),

      render: (row) => (
        <Flex justify="center">
          <Menu shadow="md" width={160} position="bottom-end">

            <Menu.Target>
              <Button
                size="xs"
                radius="md"
                rightSection={<IconChevronRight size={14} />}
                style={{
                  backgroundColor: isDark ? "#ffffff" : "#000000",
                  color: isDark ? "#000000" : "#ffffff",
                }}
              >
                <IconMenu2 size={18} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                backgroundColor: isDark ? "#1c1f23" : "#ffffff",
              }}
            >

              <Menu.Item
                style={{
                  color: row.enabled ? "red" : "green",
                }}
                onClick={() =>
                  statusMutation.mutate({
                    id: row.id,
                    activation: !row.enabled,
                  })
                }
              >
                {row.enabled
                  ? t("buttons.deactivate")
                  : t("buttons.activate")}
              </Menu.Item>

              <Menu.Item
                onClick={() => {
                  setEditId(row.id)
                  setOpenedEdit(true)
                }}
              >
                {t("buttons.edit")}
              </Menu.Item>

            </Menu.Dropdown>
          </Menu>
        </Flex>
      ),
    },

    {
      key: "enabled",
      label: t("tableData.status"),

      render: (row) => (
        <Flex justify="center">
          {row.enabled ? (
            <IconCheck size={20} color="green" />
          ) : (
            <IconX size={20} color="red" />
          )}
        </Flex>
      ),
    },

    {
      key: "titleRu",
      label: t("controlGroups.fields.titleRu"),

      render: (row) =>
        i18n.language === "kg"
          ? row.titleKg
          : row.titleRu,
    },

    {
      key: "titleKg",
      label: t("controlGroups.fields.titleKg"),

      render: (row) =>
        i18n.language === "kg"
          ? row.titleKg
          : row.titleRu,
    },

    {
      key: "identifier",
      label: t("controlGroups.fields.identifier"),
    },

    {
      key: "parent",
      label: t("controlGroups.fields.parent"),

      render: (row) =>
        row.parent
          ? i18n.language === "kg"
            ? row.parent.titleKg
            : row.parent.titleRu
          : "-",
    },
  ]

  return (
    <>
      <TableData
        columns={columns}
        data={data?.content ?? []}
        loading={isLoading}

        page={page}
        totalPages={data?.totalPages ?? 1}
        totalElements={data?.totalElements ?? 0}
        pageSize={pageSize}

        onPageChange={setPage}

        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}

        onAdd={() => setOpenedAdd(true)}
        onFilter={() => setOpenedFilter(true)}
      />

      <ControlGroupsAddModal
        opened={openedAdd}
        onClose={() => setOpenedAdd(false)}
      />

      <ControlGroupsEditModal
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        controlGroupId={editId}
      />

      <FilterModal<ControlGroupsFilter>
        opened={openedFilter}
        onClose={() => setOpenedFilter(false)}

        title={t("controlGroupsFilter.title")}

        initialValues={controlGroupsFilterInitialValues}

        fields={controlGroupsFilter.map(
          (field: FilterField<ControlGroupsFilter>) => ({
            ...field,
            label: t(`controlGroupsFilter.fields.${field.name}`),
            placeholder: t(
              `controlGroupsFilter.placeholders.${field.name}`
            ),
          })
        )}

        onApply={(values) => {
          setFilter({
            id: values.id,
            title: values.titleRu || values.titleKg || undefined,
            parentId: values.parentId,
          })

          setPage(1)
        }}
      />
    </>
  )
}