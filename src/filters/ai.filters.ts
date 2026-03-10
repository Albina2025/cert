import type { FilterField } from "../UI/filter/FilterModal";

export type AiFilter = {
  ministryId: string | null;
  computePlatformTypeId: string | null;
};

export const aiFilterInitialValues: AiFilter = {
  ministryId: null,
  computePlatformTypeId: null,
};

export const aiFilterFields: FilterField<AiFilter>[] = [
   {
    type: "select",
    name: "ministryId",
    label: "Выберите субъект",
    data: [
      { value: "1", label: "Минфин" },
      { value: "2", label: "Минздрав" },
      { value: "3", label: "Генеральная Прокуратура" },
      { value: "4", label: "Министерство внутренних дел" },
      { value: "5", label: "ГКНБ" },
    ],
    placeholder: "Выберите субъект", 
  },
  {
    type: "select",
    name: "computePlatformTypeId",
    label: "Тип вычислительной платформы",
    data: [
      { value: "1", label: "Server" },
      { value: "2", label: "Workstation" },
    ],
    placeholder: "Выберите тип платформы",
  },
];