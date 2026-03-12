import { z } from "zod";
import { requiredString, optionalString } from "./common.schema";

export const softwareSchema = z.object({
  ministryId: requiredString,

  softwareName: requiredString,
  softwarePurpose: optionalString,

  manufacturer: optionalString,
  supplier: optionalString,

  purchaseDate: optionalString,
  purchaseAmount: optionalString,
  purchaseCurrencyId: requiredString,

  softwareVersion: optionalString,
  lastUpdateDate: optionalString,

  licenseType: optionalString,
  licenseExpiryDate: optionalString,
  licenseCount: optionalString,
});

export type SoftwareFormValues = z.infer<typeof softwareSchema>;