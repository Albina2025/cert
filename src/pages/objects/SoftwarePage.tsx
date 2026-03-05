// import { useState, useMemo } from 'react'
// import { useSelector } from 'react-redux'
// import { useTranslation } from 'react-i18next'
// import { TableData } from '../../layout/tableData/TableData'
// import { SoftwareAddModal } from '../../features/object/software/SoftwareAddModal'
// import { SoftwareFilterModal } from '../../features/object/software/SoftwareFilterModal'
// import type { RootState } from '../../store'
// import type { SoftwareType } from '../../types/dataTypes'
// import type { SoftwareFilterType } from '../../types/dataTypes'

// export const SoftwarePage: React.FC = () => {
//   const [openedAdd, setOpenedAdd] = useState(false)
//   const [openedFilter, setOpenedFilter] = useState(false)
//   const { t } = useTranslation()


//   const [filter, setFilter] = useState<SoftwareFilterType>({
//     subjectId: null,
//   })

//   const handleApplyFilter = (values: SoftwareFilterType) => {
//     setFilter(values)
//   }

//   const allItems = useSelector((state: RootState) => state.data.items)


//   const softwareData: SoftwareType[] = useMemo(() => {
//     const onlySoftware = allItems
//       .filter((item) => item.type === 'software')
//       .map((item) => item.data as SoftwareType)

//     return onlySoftware.filter((item) => {
//       const subjectMatch =
//         !filter.subjectId || item.subject === filter.subjectId

//       return subjectMatch
//     })
//   }, [allItems, filter])

//    const columns: { key: keyof SoftwareType | 'action'; label: string }[] = [
//     { key: 'action', label: t('object.software.action') },
//     { key: 'subject', label: t('object.software.subject') },
//     { key: 'name', label: t('object.software.name') },
//     { key: 'purpose', label: t('object.software.purpose') },
//     { key: 'manufacturer', label: t('object.software.manufacturer') },
//     { key: 'supplier', label: t('object.software.supplier') },
//     { key: 'purchaseDate', label: t('object.software.purchaseDate') },
//     { key: 'purchaseAmount', label: t('object.software.purchaseAmount') },
//     { key: 'currency', label: t('object.software.currency') },
//     { key: 'lastUpdateDate', label: t('object.software.lastUpdateDate') },
//     { key: 'licenseEndDate', label: t('object.software.licenseEndDate') },
//     { key: 'version', label: t('object.software.version') },
//     { key: 'licenseType', label: t('object.software.licenseType') },
//     { key: 'licenseCount', label: t('object.software.licenseCount') },
//   ]

//   return (
//     <>
//       <TableData
//         columns={columns}
//         data={softwareData}
//         onAdd={() => setOpenedAdd(true)}
//         onFilter={() => setOpenedFilter(true)}
//       />

//       <SoftwareAddModal
//         opened={openedAdd}
//         onClose={() => setOpenedAdd(false)}
//       />

//       <SoftwareFilterModal
//         opened={openedFilter}
//         onClose={() => setOpenedFilter(false)}
//         onApply={handleApplyFilter}
//       />
//     </>
//   )
// }

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { TableData, type Column } from "../../layout/tableData/TableData";
import { SoftwareAddModal } from "../../features/object/software/SoftwareAddModal";
import { SoftwareEditModal } from "../../features/object/software/SoftwareEditeModal";
import { SoftwareFilterModal } from "../../features/object/software/SoftwareFilterModal";

import { getSoftwareList } from "../../services/software.service";

import type {SoftwareSearchRequest } from "../../types/software/software.request.types";
import type { SoftwareSearchResponse } from "../../types/software/software.response.types";

import type { SoftwareItem } from "../../types/software/software.response.types";

export const SoftwarePage: React.FC = () => {
  const { t } = useTranslation();

  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filter, setFilter] = useState<{
    ministryId: number | null;
  }>({
    ministryId: null,
  });

  // ================= SEARCH =================
 const { data, isLoading } = useQuery<
  SoftwareSearchResponse
>({
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

  // ================= COLUMNS =================
 const columns: Column<SoftwareItem>[] = [
  { key: "id", label: "ID" },

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
    label: t("softwareModal.fields.version"),
  },

  {
    key: "licenseType",
    label: t("softwareModal.fields.licenseType"),
  },

  // 🔥 Action колонка
  {
    key: "id",
    label: t("softwareModal.software.action"),
    render: (row) => (
      <button
        onClick={() => {
          setEditId(row.id);
          setOpenedEdit(true);
        }}
      >
        {t("softwareModal.buttons.save")}
      </button>
    ),
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

      {/* ================= MODALS ================= */}

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

      <SoftwareFilterModal
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