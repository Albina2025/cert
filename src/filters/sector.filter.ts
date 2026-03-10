import type { FilterField } from "../UI/filter/FilterModal";

export type SectorFilter = {
  title: string;
  address: string;
  enabled: boolean;
  exclude: string | number | undefined;
  auditedMinistries: boolean;
};


export const sectorFilterInitialValues: SectorFilter = {
  title: "",
  address: "",
  enabled: false,
  exclude: "",
  auditedMinistries: false,
};


export const sectorFilterFields: FilterField<SectorFilter>[] = [
  {
    type: "text",
    name: "title",
    label: "",
  },
  {
    type: "text",
    name: "address",
    label: "",
  },
  {
    type: "switch",
    name: "enabled",
    label: "",
  },
  {
    type: "number",
    name: "exclude",
    label: "",
  },
  {
    type: "switch",
    name: "auditedMinistries",
    label: "",
  },
];