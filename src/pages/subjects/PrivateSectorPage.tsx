import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { TableData, type Column  } from "../../layout/tableData/TableData";
import {PrivateSectorAddModal, PrivateSectorFilterModal, PrivateSectorEditModal} from "../../features/subject/privateSector/index"
import { api } from "../../api/axios";
import type {SectorSearchRequest} from "../../types/sector/sector.request.types";
import type {SectorItem, SectorSearchResponse} from "../../types/sector/sector.response.types";
import { Button, Flex, Menu, useMantineColorScheme } from "@mantine/core";
import { IconChevronRight, IconMenu2, IconCheck, IconX } from "@tabler/icons-react";
import { changeSectorStatus } from "../../services/sector.service";

export const PrivateSectorPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: ({ id, activation }: { id: number; activation: boolean }) =>
      changeSectorStatus(id, activation),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["privateSector"],
      });
    },
  });

  const [filter, setFilter] =
  useState<SectorSearchRequest["filter"]>({
    title: undefined,
    address: undefined,
     enabled: undefined,
    exclude: undefined,
    auditedMinistries: undefined,
  });


  const { data, isLoading } = useQuery<SectorSearchResponse>({
    queryKey: ["privateSector", page, pageSize, filter],
    queryFn: async () => {
      const request: SectorSearchRequest = {
        pageRequest: {
          page: page - 1,
          limit: pageSize,
        },
        sorting: {
          sortBy: "ID",
          sortDirection: "ASC",
        },
        filter: filter,
      };

      const response = await api.post(
        "/api/v1/sector/search",
        request
      );

      return response.data;
    },
  });

  
  const columns: Column<SectorItem>[] = [
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
                style={{
                  color: isDark ? "#ffffff" : "#000000",
                }}
                onClick={() => {
                  setEditId(row.id);
                  setOpenedEdit(true);
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
      label: t("privateSectorModal.fields.titleRu"),
      render: (row) =>
        i18n.language === "kg"
          ? row.titleKg
          : row.titleRu,
    },

    {
      key: "titleKg",
      label: t("privateSectorModal.fields.titleKg"),
      render: (row) =>
        i18n.language === "kg"
          ? row.titleKg
          : row.titleRu,
    },
  
    {
      key: "parent",
      label: t("privateSectorModal.fields.parent"),
      render: (row) =>
        row.parent
          ? i18n.language === "kg"
            ? row.parent.titleKg
            : row.parent.titleRu
          : "-",
    },

  
    {
      key: "address",
      label: t("privateSectorModal.fields.address"),
    },

    {
      key: "logo",
      label: t("privateSectorModal.fields.logo"),
    },
];

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
          setPageSize(size);
          setPage(1);
        }}
        onAdd={() => setOpenedAdd(true)}
        onFilter={() => setOpenedFilter(true)}
      />

      <PrivateSectorAddModal
        opened={openedAdd}
        onClose={() => setOpenedAdd(false)}
      />

      <PrivateSectorEditModal
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        sectorId={editId}
      />

      <PrivateSectorFilterModal
        opened={openedFilter}
        onClose={() => setOpenedFilter(false)}
        onApply={(values) => {
          setFilter(values);
          setPage(1);
        }}
      />
    </>
  );
};