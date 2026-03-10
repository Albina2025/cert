import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Menu, Button, Flex } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import {  IconChevronRight, IconMenu2 } from "@tabler/icons-react";
import { TableData, type Column } from "../../layout/tableData/TableData";
import { getSoftwareList } from "../../services/software.service";
import type {SoftwareSearchRequest } from "../../types/software/software.request.types";
import type { SoftwareSearchResponse } from "../../types/software/software.response.types";
import type { SoftwareItem } from "../../types/software/software.response.types";
import {SoftwareAddModal, SoftwareEditModal} from "../../features/object/software/index"
import { FilterModal } from "../../UI/filter/FilterModal";
import {softwareFilterFields, softwareFilterInitialValues, type SoftwareFilter} from "../../filters/software.filters";

export const SoftwarePage: React.FC = () => {
  const { t } = useTranslation();
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filter, setFilter] = useState<SoftwareSearchRequest["filter"]>({
    ministryId: null,
  });
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

 const { data, isLoading } = useQuery<SoftwareSearchResponse>({
  queryKey: ["software", page, pageSize, filter],
  queryFn: async () => {
    const request: SoftwareSearchRequest = {
      pageRequest: {
        page: page - 1,
        limit: pageSize,
      },
      sorting: {
        sortBy: "ID",
        sortDirection: "ASC",
      },
      filter,
    };

    const response = await getSoftwareList(request);
    return response.data;
  },
});


 const columns: Column<SoftwareItem>[] = [
  { key: "id", label: "ID" },
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
    key: "ministryDto",
    label: t("softwareModal.fields.subject"),
    render: (row) => row.ministryDto?.titleRu ?? "-",
  },

  {
    key: "softwareName",
    label: t("softwareModal.fields.name"),
  },

  {
    key: "softwareVersion",
    label: t("softwareModal.fields.softwareVersion"),
  },

  {
    key: "licenseType",
    label: t("softwareModal.fields.licenseType"),
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

      <SoftwareAddModal
        opened={openedAdd}
        onClose={() => setOpenedAdd(false)}
      />

      <SoftwareEditModal
        opened={openedEdit}
        onClose={() => {
          setOpenedEdit(false);
          setEditId(null);
        }}
        softwareId={editId}
      />
      <FilterModal<SoftwareFilter>
        opened={openedFilter}
        onClose={() => setOpenedFilter(false)}
        title={t("softwareFilter.title")}
        initialValues={softwareFilterInitialValues}
        fields={softwareFilterFields.map((f) => ({ ...f, label: t("softwareFilter.fields.subject") }))}
        onApply={(values) => {
          setFilter({
            ministryId: values.ministryId
              ? Number(values.ministryId)
              : null,
          });

          setPage(1);
        }}
      />
    </>
  );
};