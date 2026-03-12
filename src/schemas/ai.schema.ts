import { z } from "zod";
import { requiredString, optionalString } from "./common.schema";

export const aiSchema = z.object({
  ministryId: requiredString,
  computePlatformTypeId: requiredString,

  hardwareName: optionalString,
  hardwarePurpose: optionalString,
  responsibleUnit: optionalString,
  hardwareSupplier: optionalString,

  purchaseDate: optionalString,
  purchaseAmount: optionalString,
  purchaseCurrencyId: requiredString,

  hardwareSpecs: optionalString,

  modelName: optionalString,
  modelPurpose: optionalString,
  modelDeveloper: optionalString,

  usesApi: z.boolean(),
  apiProvider: optionalString,
});

export type AiFormValues = z.infer<typeof aiSchema>;