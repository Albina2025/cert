import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { TableData, type Column  } from "../../layout/tableData/TableData";
import { api } from "../../api/axios";
import type {AiSearchRequest} from "../../types/ai/ai.request.types";
import type {  AiSearchResponse} from "../../types/ai/ai.response.types";
import type { AiItem} from "../../types/ai/ai.item.types";
import { Button, Flex, Menu, useMantineColorScheme } from "@mantine/core";
import { IconChevronRight, IconMenu2 } from "@tabler/icons-react";
import {AiAddModal, AiEditModal, AiFilterModal} from "../../features/object/ai/index";

export const AIPage: React.FC = () => {
  const { t } = useTranslation();
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

  const [filter, setFilter] =
    useState<AiSearchRequest["filter"]>({
      ministryId: null,
      computePlatformTypeId: null,
    });


  const { data, isLoading } = useQuery<AiSearchResponse<AiItem>>({
    queryKey: [
      "ai", 
      page, 
      pageSize,  
      filter?.ministryId,
      filter?.computePlatformTypeId,
    ],
    queryFn: async () => {
      const request: AiSearchRequest = {
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

      const response = await api.post("/api/v1/ai/search",request);
      return response.data;
    },
  });


  const columns: Column<AiItem>[] = [
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
      label: t("aiModal.fields.ministryId"),
      render: (row) => row.ministryDto?.titleRu,
    },

    {
      key: "computePlatformType",
      label: t("aiModal.fields.computePlatformTypeId"),
      render: (row) => row.computePlatformType?.titleRu,
    },

    { key: "hardwareName", label: t("aiModal.fields.hardwareName") },
    { key: "hardwarePurpose", label: t("aiModal.fields.hardwarePurpose") },
    { key: "responsibleUnit", label: t("aiModal.fields.responsibleUnit") },
    { key: "hardwareSupplier", label: t("aiModal.fields.hardwareSupplier") },

    { key: "purchaseDate", label: t("aiModal.fields.purchaseDate") },
    { key: "purchaseAmount", label: t("aiModal.fields.purchaseAmount") },

    {
      key: "purchaseCurrency",
      label: t("aiModal.fields.purchaseCurrencyId"),
      render: (row) => row.purchaseCurrency?.titleRu,
    },

    { key: "hardwareSpecs", label: t("aiModal.fields.hardwareSpecs") },
    { key: "modelName", label: t("aiModal.fields.modelName") },
    { key: "modelPurpose", label: t("aiModal.fields.modelPurpose") },
    { key: "modelDeveloper", label: t("aiModal.fields.modelDeveloper") },

    {
      key: "usesApi",
      label: t("aiModal.fields.usesApi"),
      render: (row) => (row.usesApi ? "Yes" : "No"),
    },

    { key: "apiProvider", label: t("aiModal.fields.apiProvider") },
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

      <AiAddModal
        opened={openedAdd}
        onClose={() => {
          setOpenedAdd(false);
        }}
      />

      <AiEditModal
        opened={openedEdit}
        aiId={editId}
        onClose={() => {
          setOpenedEdit(false)
          setEditId(null);
        }}
        
      />

      <AiFilterModal
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