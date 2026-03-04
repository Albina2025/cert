// import { useState, useMemo } from 'react'
// import { useSelector } from 'react-redux'
// import { useTranslation } from 'react-i18next'
// import { TableData } from '../../layout/tableData/TableData'
// import { PrivateSectorAddModal } from '../../features/subject/privateSector/PrivateSectorAddModal'
// import { PrivateSectorFilterModal } from '../../features/subject/privateSector/PrivateSectorFilterModal'
// import type { RootState } from '../../store'
// import type {
//   PrivateSectorType,
//   PrivateSectorFilterType,
// } from '../../types/dataTypes'

// export const PrivateSectorPage: React.FC = () => {
//   const [openedAdd, setOpenedAdd] = useState(false)
//   const [openedFilter, setOpenedFilter] = useState(false)
//   const { t } = useTranslation()


//   const [filter, setFilter] =
//     useState<PrivateSectorFilterType | null>(null)

//   const allItems = useSelector(
//     (state: RootState) => state.data.items
//   )

//   const privateData = useMemo(() => {
//     return allItems
//       .filter((item) => item.type === 'privateSector')
//       .map((item) => item.data as PrivateSectorType)
//       .filter((item) => {
//         if (!filter) return true

//         if (
//           filter.name &&
//           !item.subject
//             ?.toLowerCase()
//             .includes(filter.name.toLowerCase())
//         ) {
//           return false
//         }

//         if (
//           filter.address &&
//           !item.purpose
//             ?.toLowerCase()
//             .includes(filter.address.toLowerCase())
//         ) {
//           return false
//         }

//         return true
//       })
//   }, [allItems, filter])

//   const columns: { key: keyof PrivateSectorType; label: string }[] =
//     [
//       { key: 'subject', label: t('privateSectorModal.fields.name') },
//       { key: 'name', label: t('privateSectorModal.fields.parent') },
//       { key: 'purpose', label: t('privateSectorModal.fields.address') },
//       { key: 'status', label: t('privateSectorModal.fields.status') },
//     ]

//   return (
//     <>
//       <TableData
//         columns={columns}
//         data={privateData}
//         onAdd={() => setOpenedAdd(true)}
//         onFilter={() => setOpenedFilter(true)}
//       />

//       <PrivateSectorAddModal
//         opened={openedAdd}
//         onClose={() => setOpenedAdd(false)}
//       />

//       <PrivateSectorFilterModal
//         opened={openedFilter}
//         onClose={() => setOpenedFilter(false)}
//         onApply={(values) => setFilter(values)}
//       />
//     </>
//   )
// }

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { TableData } from "../../layout/tableData/TableData";
import { PrivateSectorAddModal } from "../../features/subject/privateSector/PrivateSectorAddModal";
import { PrivateSectorFilterModal } from "../../features/subject/privateSector/PrivateSectorFilterModal";
import { api } from "../../api/axios";

import type {
  SectorSearchRequest,
} from "../../types/sector/sector.request.types";

import type {
  SectorItem,
  SectorSearchResponse,
} from "../../types/sector/sector.response.types";

import type { Column } from "../../layout/tableData/TableData";

export const PrivateSectorPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filter, setFilter] =
  useState<SectorSearchRequest["filter"]>({
    title: undefined,
    address: undefined,
     enabled: undefined,
    exclude: undefined,
    auditedMinistries: undefined,
  });

  // =========================
  // 🔥 SEARCH REQUEST
  // =========================
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

  // =========================
  // TABLE COLUMNS
  // =========================
  
  const columns: Column<SectorItem>[] = [
  {
    key: "id",
    label: "ID",
  },

  // ================= TITLE =================
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