import type { FilterField } from "../UI/filter/FilterModal";

export type SoftwareFilter = {
  ministryId: string | null;
   title?: string;
};


export const softwareFilterInitialValues: SoftwareFilter = {
  ministryId: null,
};

export const softwareFilterFields: FilterField<SoftwareFilter>[] = [
  {
    type: "select",
    name: "ministryId",
    label: "", 
    data: [
      { value: "1", label: "Минфин" },
      { value: "2", label: "Минздрав" },
    ],
  },
];